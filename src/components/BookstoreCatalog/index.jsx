// src/components/BookstoreCatalog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiList,
  FiSliders,
} from "react-icons/fi";
import { useJson } from "../../hooks/useJson"; // <-- dùng hook đã có

/* ==================== CONFIG ==================== */
const ZALO = "https://zalo.me/0369984849";
const STORE_URL = `${import.meta.env.BASE_URL}data/store/store.json`;

/* ==================== HELPERS ==================== */
const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
const unique = (arr) => [...new Set(arr.filter(Boolean))];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ==================== BREADCRUMBS ==================== */
function Breadcrumbs({ items = [], current = "" }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((it, i) => (
          <li key={i} className="inline-flex items-center">
            <Link
              to={it.to}
              className="px-1 py-0.5 rounded hover:text-slate-700 hover:underline"
            >
              {it.label}
            </Link>
            <span className="mx-1 select-none">›</span>
          </li>
        ))}
        <li
          className="px-1 py-0.5 rounded font-medium text-slate-800"
          aria-current="page"
        >
          {current}
        </li>
      </ol>
    </nav>
  );
}

/* Ẩn thumb mặc định của input range (để không bị 2 chấm) */
const RangeThumbHider = () => (
  <style>{`
  .range-none::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 0; height: 0; border: 0; background: transparent;
  }
  .range-none::-moz-range-thumb { width:0; height:0; border:0; background:transparent; }
  .range-none::-ms-thumb { width:0; height:0; border:0; background:transparent; }
  .range-none::-webkit-slider-runnable-track { -webkit-appearance: none; background: transparent; }
  `}</style>
);

/* ==================== MAIN ==================== */
export default function BookstoreCatalog() {
  // fetch products from public/data/store.json with TTL cache
  const {
    data: storeData,
    loading: loadingProducts,
    error: productsError,
  } = useJson(STORE_URL, { ttl: 120000 }); // ttl = 2 phút (tùy chỉnh)

  const products = storeData?.products ?? [];
  const loading = loadingProducts;
  const error = productsError;

  // search/sort/grid/page/state
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [grid, setGrid] = useState(3); // 2/3/4
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false);
  const [quick, setQuick] = useState(null);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Filters
  const allCats = useMemo(
    () => unique(products.map((p) => p.category)),
    [products]
  );
  const allPubs = useMemo(
    () => unique(products.map((p) => p.publisher)),
    [products]
  );
  const allTags = useMemo(
    () => unique(products.flatMap((p) => p.tags || [])),
    [products]
  );

  // all grades Lớp 6..Lớp 12
  const allGrades = useMemo(
    () =>
      unique(
        Array.from({ length: 7 }, (_, i) => `Lớp ${6 + i}`).concat(
          products.map((p) => p.grade)
        )
      ),
    [products]
  );

  const priceMin = 100000;
  const priceMax = 400000;

  const [filters, setFilters] = useState({
    classes: [], // <-- new: lớp filter
    categories: [],
    publishers: [],
    minPrice: priceMin,
    maxPrice: priceMax,
    minRating: 0,
    tags: [],
  });

  // derive
  const filtered = useMemo(() => {
    const q = debounced;
    return products.filter((p) => {
      if (q) {
        const blob = `${p.title} ${p.author} ${p.publisher} ${p.category} ${
          p.tags?.join(" ") || ""
        } ${p.grade || ""}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (filters.classes.length && !filters.classes.includes(p.grade))
        return false;
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (
        filters.publishers.length &&
        !filters.publishers.includes(p.publisher)
      )
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice)
        return false;
      if (p.rating < filters.minRating) return false;
      if (filters.tags.length) {
        const hasAll = filters.tags.every((t) => p.tags?.includes(t));
        if (!hasAll) return false;
      }
      return true;
    });
  }, [products, debounced, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        arr.sort((a, b) => b.rating - a.rating);
        break;
      case "title-asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        arr.sort((a, b) => b.reviews - a.reviews);
    }
    return arr;
  }, [filtered, sort]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageSafe = clamp(page, 1, totalPages);
  const items = sorted.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  useEffect(() => setPage(1), [debounced, filters, sort]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <RangeThumbHider />

      {/* BREADCRUMBS */}
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Nhà sách", to: "/store" },
        ]}
        current={
          filters.categories.length === 1
            ? filters.categories[0]
            : "Tất cả sản phẩm"
        }
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-2xl bg-[#001F5D] text-white px-4 py-2 text-sm font-semibold shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4h10a2 2 0 0 1 2 2v9H5V6a2 2 0 0 1 2-2zm12 13H5l-2 3h18l-2-3z" />
            </svg>
            Nhà sách dayhocvaluyenthi
          </span>
          <span className="text-sm text-slate-500">
            Sản phẩm chất lượng – Giá tốt
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-[280px]">
            <FiSearch className="absolute left-3 top-2.5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm sách, tác giả, nhà XB, từ khoá…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          {!loading && !error && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-sm text-sky-700 md:inline-flex">
              {sorted.length} kết quả
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600">
              Lỗi khi tải sản phẩm: {error.message}
            </div>
          )}

          <div className="hidden md:flex items-center gap-2">
            <label className="text-sm text-slate-600">Sắp xếp:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-slate-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <option value="popular">Phổ biến</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating-desc">Đánh giá cao</option>
              <option value="title-asc">Tên A→Z</option>
            </select>
          </div>

          <button
            className="md:hidden inline-flex items-center gap-2 rounded-xl border px-3 py-2"
            onClick={() => setOpenFilters(true)}
          >
            <FiFilter /> Lọc
          </button>

          <div className="hidden md:flex items-center gap-1">
            <button
              className={`p-2 rounded-lg ${grid === 2 ? "bg-slate-100" : ""}`}
              onClick={() => setGrid(2)}
              aria-label="2 cột"
            >
              <FiList />
            </button>
            <button
              className={`p-2 rounded-lg ${grid === 3 ? "bg-slate-100" : ""}`}
              onClick={() => setGrid(3)}
              aria-label="3 cột"
            >
              <FiGrid />
            </button>
            <button
              className={`p-2 rounded-lg ${grid === 4 ? "bg-slate-100" : ""}`}
              onClick={() => setGrid(4)}
              aria-label="4 cột"
            >
              <FiGrid className="scale-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-6">
        {/* SIDEBAR */}
        <aside className="hidden md:block">
          <div className="md:sticky md:top-24">
            {loading ? (
              <SidebarSkeleton />
            ) : (
              <Filters
                allCats={allCats}
                allPubs={allPubs}
                allTags={allTags}
                priceMin={priceMin}
                priceMax={priceMax}
                filters={filters}
                setFilters={setFilters}
                allGrades={allGrades} // <-- pass grades
              />
            )}
          </div>
        </aside>

        {/* LIST */}
        <div>
          {loading ? (
            <SkeletonGrid grid={grid} />
          ) : (
            <>
              <div
                className={`grid gap-4 grid-cols-2 ${
                  grid === 2
                    ? "md:grid-cols-2"
                    : grid === 4
                    ? "md:grid-cols-4"
                    : "md:grid-cols-3"
                }`}
              >
                {items.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col h-full"
                  >
                    {/* IMAGE */}
                    <div className="p-2 relative aspect-[3/4] overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        draggable={false}
                      />
                      {p.badge && (
                        <span className="absolute left-2 top-2 text-xs font-semibold px-2 py-1 rounded-lg bg-white/90 backdrop-blur shadow">
                          {p.badge}
                        </span>
                      )}

                      {/* Desktop overlay */}
                      <div className="hidden md:flex absolute inset-x-2 bottom-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={ZALO}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-xl bg-[#001F5D] text-white px-3 py-2 text-sm font-semibold shadow hover:opacity-95 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Mua qua Zalo
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuick(p);
                          }}
                          className="flex-1 rounded-xl bg-white/95 backdrop-blur px-3 py-2 text-sm font-semibold shadow hover:bg-white"
                        >
                          Xem nhanh
                        </button>
                      </div>

                      {/* Mobile: 2 nút tròn nhỏ */}
                      <div className="md:hidden absolute right-2 bottom-2 flex gap-2">
                        <a
                          href={ZALO}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Mua qua Zalo"
                          className="h-10 w-10 rounded-full grid place-items-center bg-white text-white shadow-md active:scale-95"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span >
                            <img src="/images/icons/zalo_icon.png" alt="" className="w-[50%] mx-auto" />
                          </span>
                        </a>
                        <button
                          aria-label="Xem nhanh"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuick(p);
                          }}
                          className="h-10 w-10 rounded-full grid place-items-center bg-white/95 backdrop-blur border shadow-md active:scale-95"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-semibold text-slate-900 line-clamp-3 h-[48px]">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 my-auto">
                        {p.author} • {p.publisher} •{" "}
                        <span className="text-xs">{p.grade}</span>
                      </p>

                      <div className="flex items-center gap-2 mt-auto">
                        <Stars value={p.rating} />
                        <span className="text-xs text-slate-500">
                          ({p.reviews})
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-extrabold text-[#001F5D]">
                          {formatVND(p.price)}
                        </span>
                        <button
                          className="p-2 rounded-lg border hover:bg-slate-50"
                          aria-label="Yêu thích"
                          title="Yêu thích"
                        >
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {items.length === 0 && (
                <div className="py-16 text-center text-slate-500">
                  Không tìm thấy sản phẩm phù hợp.
                </div>
              )}

              {/* PAGINATION */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => clamp(p - 1, 1, totalPages))}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 disabled:opacity-40"
                >
                  <FiChevronLeft /> Trước
                </button>
                <span className="text-sm text-slate-600">
                  Trang <b>{pageSafe}</b> / {totalPages}
                </span>
                <button
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => clamp(p + 1, 1, totalPages))}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 disabled:opacity-40"
                >
                  Sau <FiChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS DRAWER */}
      <AnimatePresence>
        {openFilters && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpenFilters(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-4 overflow-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 22, stiffness: 250 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Bộ lọc</h3>
                <button
                  className="p-2 rounded-lg hover:bg-slate-100"
                  onClick={() => setOpenFilters(false)}
                >
                  <FiX />
                </button>
              </div>

              {loading ? (
                <SidebarSkeleton />
              ) : (
                <Filters
                  allCats={allCats}
                  allPubs={allPubs}
                  allTags={allTags}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  filters={filters}
                  setFilters={setFilters}
                  compact
                  allGrades={allGrades}
                />
              )}

              <button
                className="mt-4 w-full rounded-xl bg-[#001F5D] text-white px-4 py-2 font-semibold"
                onClick={() => setOpenFilters(false)}
              >
                Áp dụng
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK VIEW */}
      <AnimatePresence>
        {quick && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setQuick(null)}
            />
            <motion.div
              className="relative z-10 w-[96%] md:w-[920px] mx-auto mt-[4vh] md:mt-[8vh] rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[88vh]"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ type: "spring", damping: 20, stiffness: 240 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h4 className="font-semibold line-clamp-1">{quick.title}</h4>
                <button
                  className="p-2 rounded-lg hover:bg-slate-100"
                  onClick={() => setQuick(null)}
                >
                  <FiX />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="max-h-[calc(88vh-48px)] overflow-y-auto">
                <div className="grid md:grid-cols-2">
                  <div className="p-4">
                    <div className="aspect-[4/5] overflow-hidden rounded-xl">
                      <img
                        src={quick.cover}
                        alt={quick.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg bg-slate-100">
                      {quick.category} • {quick.publisher}
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{quick.title}</h3>
                    <p className="text-sm text-slate-500">
                      Tác giả: {quick.author}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Stars value={quick.rating} />
                      <span className="text-xs text-slate-500">
                        ({quick.reviews} đánh giá)
                      </span>
                    </div>

                    <div className="mt-3">
                      <span className="text-2xl font-extrabold text-[#001F5D]">
                        {formatVND(quick.price)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(quick.tags || []).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-lg bg-slate-100"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-3 pb-3">
                      <a
                        href={ZALO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl bg-[#001F5D] text-white px-4 py-2 font-semibold text-center"
                      >
                        Mua qua Zalo
                      </a>
                      <button
                        className="flex-1 rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
                        onClick={() => setQuick(null)}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==================== SUBS ==================== */

function Filters({
  allCats,
  allPubs,
  allTags,
  priceMin,
  priceMax,
  filters,
  setFilters,
  compact = false,
  allGrades = [],
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <FiSliders /> Bộ lọc
      </h3>

      {/* NEW: Lớp filter */}
      <Section title="Lớp">
        <TagGroup
          options={allGrades}
          values={filters.classes}
          onToggle={(v) =>
            setFilters((f) => ({
              ...f,
              classes: toggleInArray(f.classes, v),
            }))
          }
        />
      </Section>

      <Section title="Danh mục">
        <TagGroup
          options={allCats}
          values={filters.categories}
          onToggle={(v) =>
            setFilters((f) => ({
              ...f,
              categories: toggleInArray(f.categories, v),
            }))
          }
        />
      </Section>

      <Section title="Nhà xuất bản">
        <TagGroup
          options={allPubs}
          values={filters.publishers}
          onToggle={(v) =>
            setFilters((f) => ({
              ...f,
              publishers: toggleInArray(f.publishers, v),
            }))
          }
        />
      </Section>

      <Section title="Khoảng giá">
        <div className="px-1">
          <RangeDual
            min={priceMin}
            max={priceMax}
            values={[filters.minPrice, filters.maxPrice]}
            onChange={([lo, hi]) =>
              setFilters((f) => ({ ...f, minPrice: lo, maxPrice: hi }))
            }
          />
          <div className="mt-2 text-sm text-slate-700">
            {formatVND(filters.minPrice)} – {formatVND(filters.maxPrice)}
          </div>
        </div>
      </Section>

      <Section title="Đánh giá từ">
        <RatingPills
          value={filters.minRating}
          onChange={(r) => setFilters((f) => ({ ...f, minRating: r }))}
        />
      </Section>

      {!compact && (
        <Section title="Từ khoá">
          <TagGroup
            options={allTags}
            values={filters.tags}
            onToggle={(v) =>
              setFilters((f) => ({ ...f, tags: toggleInArray(f.tags, v) }))
            }
          />
        </Section>
      )}

      <button
        className="mt-3 w-full rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
        onClick={() =>
          setFilters({
            classes: [],
            categories: [],
            publishers: [],
            minPrice: priceMin,
            maxPrice: priceMax,
            minRating: 0,
            tags: [],
          })
        }
      >
        Xoá bộ lọc
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="py-3 border-b last:border-b-0">
      <div className="text-sm font-semibold text-slate-800 mb-2">{title}</div>
      {children}
    </div>
  );
}

function TagGroup({ options, values, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
              active
                ? "bg-slate-900 text-white border-slate-900"
                : "hover:bg-slate-50"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ... rest of components (RatingPills, Stars, RangeDual, Thumb, SkeletonGrid, SidebarSkeleton, toggleInArray)
   giữ nguyên như cũ (không đổi) ... */

function RatingPills({ value, onChange }) {
  const opts = [0, 3, 4, 4.5];
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((r) => {
        const active = value === r;
        return (
          <button
            key={r}
            aria-pressed={active}
            onClick={() => onChange(r)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] md:text-sm border transition-colors ${
              active
                ? "bg-slate-900 text-white border-slate-900"
                : "hover:bg-slate-50"
            }`}
          >
            <Stars value={r || 0} small />
            <span className="leading-none">{r === 0 ? "Tất cả" : `${r}+`}</span>
          </button>
        );
      })}
    </div>
  );
}

function Stars({ value = 0, small = false }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const arr = Array.from({ length: 5 }, (_, i) => i);
  const size = small ? "text-[12px]" : "text-[14px]";
  return (
    <div className={`inline-flex ${size} text-amber-500 leading-none`}>
      {arr.map((i) => {
        if (i < full) return <Star key={i} fill />;
        if (i === full && half) return <Star key={i} half />;
        return <Star key={i} />;
      })}
    </div>
  );
}
function Star({ fill = false, half = false }) {
  if (half)
    return (
      <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]" aria-hidden="true">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half)"
          stroke="currentColor"
          d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.401 8.168L12 18.897l-7.335 3.866 1.401-8.168L.132 9.21l8.2-1.192L12 .587z"
        />
      </svg>
    );
  if (fill)
    return (
      <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.401 8.168L12 18.897l-7.335 3.866 1.401-8.168L.132 9.21l8.2-1.192L12 .587z"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.401 8.168L12 18.897l-7.335 3.866 1.401-8.168L.132 9.21l8.2-1.192L12 .587z"
      />
    </svg>
  );
}

/* ===== Dual Range (giá) – thumb xanh trong vòng trắng, track xanh ===== */
function RangeDual({ min, max, values, onChange }) {
  const [lo, hi] = values;
  const step = 10000;

  const handleLo = (v) => {
    const nv = clamp(Number(v), min, hi - step);
    onChange([nv, hi]);
  };
  const handleHi = (v) => {
    const nv = clamp(Number(v), lo + step, max);
    onChange([lo, nv]);
  };

  const pctLo = ((lo - min) / (max - min)) * 100;
  const pctHi = ((hi - min) / (max - min)) * 100;

  return (
    <div className="relative h-8 select-none">
      {/* track */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-slate-200" />
      {/* selection */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-sky-400"
        style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
      />
      {/* ranges */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={lo}
        onChange={(e) => handleLo(e.target.value)}
        className="range-none absolute w-full h-8 appearance-none bg-transparent pointer-events-auto"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={hi}
        onChange={(e) => handleHi(e.target.value)}
        className="range-none absolute w-full h-8 appearance-none bg-transparent pointer-events-auto"
      />
      {/* thumbs */}
      <Thumb left={`${pctLo}%`} />
      <Thumb left={`${pctHi}%`} />
    </div>
  );
}
function Thumb({ left }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[22px] w-[22px] rounded-full bg-white border border-slate-300 shadow"
      style={{ left }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-[12px] w-[12px] rounded-full bg-[#1778d0]" />
      </div>
    </div>
  );
}

/* ==================== SKELETONS ==================== */
function SkeletonGrid({ grid }) {
  const cols =
    grid === 2
      ? "md:grid-cols-2"
      : grid === 4
      ? "md:grid-cols-4"
      : "md:grid-cols-3";
  return (
    <div className={`grid gap-4 grid-cols-2 ${cols}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-white overflow-hidden">
          <div className="animate-pulse">
            <div className="aspect-[4/5] bg-slate-200" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-5 bg-slate-200 rounded w-1/3 mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm animate-pulse">
      <div className="h-5 bg-slate-200 rounded w-24 mb-4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="py-3 border-b last:border-b-0">
          <div className="h-4 bg-slate-200 rounded w-28 mb-2" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="h-7 w-20 bg-slate-200 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ==================== UTILS ==================== */
function toggleInArray(arr, v) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}
