// setBackground(e, t) {
//     const s = a.default.getTheme();
//     let i;
//     if (!!s.background.color && !s.background.slug && !s.background.intensity && "grabbing" === document.documentElement.style.cursor && this.gradientRenderer && !this.patternRenderer)
//         return (this.gradientCanvas.dataset.colors = s.background.color), this.gradientRenderer.init(this.gradientCanvas), Promise.resolve();
//     const n = ++this.backgroundTempId,
//         o = this.gradientRenderer,
//         r = this.patternRenderer,
//         l = (this.gradientCanvas, this.patternCanvas);
//     this.gradientRenderer = this.patternRenderer = this.gradientCanvas = this.patternCanvas = void 0;
//     const c = s.background.intensity && s.background.intensity / 100,
//         d = !!c && c < 0;
//     let h,
//         p,
//         u,
//         m = null == i ? void 0 : i.firstElementChild;
//     if (!i)
//         if (((i = document.createElement("div")), i.classList.add("chat-background-item"), e))
//             if (c) {
//                 i.classList.add("is-pattern");
//                 const t = this.appImManager.chatsContainer.getBoundingClientRect();
//                 (h = this.patternRenderer = er.getInstance({ url: e, width: t.width, height: t.height })),
//                     (m = this.patternCanvas = h.createCanvas()),
//                     m.classList.add("chat-background-item-canvas", "chat-background-item-pattern-canvas");
//             } else s.background.slug && i.classList.add("is-image");
//         else s.background.color && i.classList.add("is-color");
//     const g = s.background.color;
//     if (g) {
//         const { canvas: e, gradientRenderer: t } = zi.create(g);
//         (u = this.gradientRenderer = t), (p = this.gradientCanvas = e), p.classList.add("chat-background-item-canvas", "chat-background-item-color-canvas"), a.default.settings.animationsEnabled && u.scrollAnimate(!0);
//     }
//     if (h) {
//         (d ? p : m).style.setProperty("--opacity-max", "" + Math.abs(c));
//     }
//     const b = new Promise((s) => {
//         const a = () => {
//             if (this.backgroundTempId !== n) return h && h.cleanup(m), void (u && u.cleanup());
//             const e = this.backgroundEl.lastElementChild;
//             if (e === i) return void s();
//             const a = [p, d ? void 0 : m].filter(Boolean);
//             a.length && i.append(...a),
//                 this.backgroundEl.append(i),
//                 Object(is.a)(
//                     i,
//                     "is-visible",
//                     !0,
//                     t ? 0 : 200,
//                     e
//                         ? () => {
//                               r && r.cleanup(l), o && o.cleanup(), e.remove();
//                           }
//                         : null,
//                     2
//                 ),
//                 s();
//         };
//         if (h) {
//             h.renderToCanvas(m).then(() => {
//                 let e;
//                 (e = d
//                     ? h.exportCanvasPatternToImage(m).then((e) => {
//                           this.backgroundTempId === n && (p.style.webkitMaskImage = `url(${e})`);
//                       })
//                     : Promise.resolve()),
//                     e.then(a);
//             });
//         } else e ? Object(hs.a)(i, e, a) : a();
//     });
//     return (this.setBackgroundPromise = Promise.race([Object(Xn.a)(500), b]));
// }