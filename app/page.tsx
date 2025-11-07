"use client";
import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prompts } from "../src/lib/promptTemplate";

// ---------------------------------------------
// 🌸 루미 블로그 에이전트 v3
// 7가지 파스텔 테마 + 5가지 포스팅 템플릿
// SEO & 애드센스 & 쿠팡파트너스 자동 대응
// ---------------------------------------------

const THEMES = [
  { id: "mint", name: "🌿 Mint Breeze", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { id: "pink", name: "🌸 Pink Bloom", bg: "bg-pink-50", ring: "ring-pink-200" },
  { id: "sky", name: "☁️ Sky Calm", bg: "bg-sky-50", ring: "ring-sky-200" },
  { id: "yellow", name: "🌼 Sunny Light", bg: "bg-yellow-50", ring: "ring-yellow-200" },
  { id: "lavender", name: "🌙 Lavender Dream", bg: "bg-violet-50", ring: "ring-violet-200" },
  { id: "olive", name: "🍃 Olive Harmony", bg: "bg-lime-50", ring: "ring-lime-200" },
  { id: "gray", name: "⚫ Classic Gray", bg: "bg-gray-50", ring: "ring-gray-200" },
];

export default function Page() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("일상/라이프");
  const [theme, setTheme] = useState(THEMES[0].id);
  const [selectedType, setSelectedType] = useState("info");
  const [htmlOut, setHtmlOut] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const activeTheme = useMemo(() => THEMES.find((t) => t.id === theme)!, [theme]);

  const handleGenerate = () => {
    if (!topic.trim()) {
      alert("주제를 입력해주세요 ✍️");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      const html = genHTML();
      setHtmlOut(html);
      setGenerating(false);
    }, 600);
  };

  const copyHTML = async () => {
    if (!htmlOut) return;
    try {
      await navigator.clipboard.writeText(htmlOut);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      const ta = taRef.current;
      if (ta) {
        ta.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    }
  };

  const genHTML = () => {
    const t = topic || "수면의 질 높이는 루틴";
    const selectedPrompt = prompts[selectedType as keyof typeof prompts].template;
    const filled = selectedPrompt
      .replaceAll("{{TOPIC}}", t)
      .replaceAll("{{CATEGORY}}", category)
      .replaceAll("{{THEME}}", THEMES.find((x) => x.id === theme)?.name || theme);

    return `<article class='grew-post'>
<h1>${t}｜루미 블로그 에이전트</h1>
<pre style="white-space: pre-wrap; font-family: inherit;">${filled}</pre>
<p style="font-size:0.8rem;color:#666;margin-top:1rem;">※ 본 글은 루미 블로그 에이전트를 통해 자동 생성된 콘텐츠 초안입니다.</p>
</article>`;
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} px-4 sm:px-6 py-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 shadow-sm bg-white/90 ring-1 ${activeTheme.ring}`}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold">✨ 루미 블로그 에이전트</h1>
          <p className="text-gray-600 mt-1">7가지 테마 × 5가지 포스팅 템플릿으로 한 번에 생성 🪄</p>

          {/* INPUTS */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">블로그 주제 ✍️</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 수면의 질 높이는 루틴"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">카테고리 🗂️</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: 일상/라이프"
                className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          {/* THEME SELECTOR */}
          <div className="mt-5">
            <p className="text-sm text-gray-700 mb-2">테마 선택 🎨</p>
            <div className="flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`px-3 py-2 rounded-2xl text-sm font-medium shadow-sm bg-white ring-1 ${t.ring} ${
                    theme === t.id ? "outline outline-2 outline-emerald-300" : ""
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* PROMPT SELECTOR */}
          <div className="mt-6">
            <h2 className="text-sm text-gray-700 mb-2">포스팅 템플릿 선택 🧠</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(prompts).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`rounded-2xl p-3 shadow-sm text-left ${
                    selectedType === key ? "ring-2 ring-emerald-300 bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </button>
              ))}
            </div>

            {/* PREVIEW */}
            <div className="mt-4 p-4 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
              <h3 className="font-bold text-gray-700">{prompts[selectedType as keyof typeof prompts].name}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mt-2">
                {prompts[selectedType as keyof typeof prompts].template.slice(0, 350)}...
              </p>
              <p className="text-xs text-gray-400 mt-2">전체 내용은 HTML 생성 시 반영됩니다.</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleGenerate}
              className="rounded-2xl px-4 py-2 bg-black text-white hover:bg-gray-800"
            >
              {generating ? "생성 중… ⏳" : "HTML 생성하기 🪄"}
            </button>
            {htmlOut && (
              <button
                onClick={copyHTML}
                className="rounded-2xl px-4 py-2 bg-white ring-1 ring-gray-300 hover:bg-gray-50"
              >
                {copied ? "복사됨 ✅" : "HTML 복사 📋"}
              </button>
            )}
          </div>
        </motion.div>

        {/* OUTPUT PREVIEW */}
        <AnimatePresence>
          {htmlOut && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mt-6 rounded-3xl p-6 bg-white ring-1 ring-gray-200 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-3">미리보기 🪄</h2>
              <div className="prose max-w-none prose-p:leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: htmlOut }} />
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-600">HTML 원본 (복붙용) 🔧</label>
                <textarea
                  ref={taRef}
                  value={htmlOut}
                  readOnly
                  className="mt-1 w-full h-64 rounded-2xl border border-gray-200 bg-gray-50 p-3 font-mono text-xs"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>ⓒ GrewBlog Agent · SEO & Adsense Friendly · Coupang Ready</p>
        </div>
      </div>
    </div>
  );
}
