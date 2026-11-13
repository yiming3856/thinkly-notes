import type { Image, Nodes, Parents } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { HastPluginDefinition, MdastPluginDefinition } from "satteri";

export function satteriAutolinkHeadingsPlugin(): HastPluginDefinition {
	return {
		name: "cactus-autolink-headings",
		element: {
			filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
			visit(node) {
				const id = node.properties?.id;
				if (typeof id !== "string" || !id) return;
				return {
					...node,
					children: [
						{
							type: "element",
							tagName: "a",
							properties: { href: `#${id}`, className: ["not-prose"] },
							children: [...node.children],
						},
					],
				};
			},
		},
	};
}

// 中日韩字符的范围，用来按"字数"而不是"单词数"估算中文阅读时间
const CJK_RANGE = "\\u3040-\\u30ff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uac00-\\ud7af\\uf900-\\ufaff";
const CJK_CHAR = new RegExp(`[${CJK_RANGE}]`, "g");

// 阅读速度：中文每分钟 400 字，英文每分钟 200 词，可按自己的习惯调整
const CJK_CHARS_PER_MINUTE = 400;
const WORDS_PER_MINUTE = 200;

function estimateReadingMinutes(text: string): number {
	const cjkCount = (text.match(CJK_CHAR) ?? []).length;
	const latinWords = text.replace(CJK_CHAR, " ").match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];
	const minutes = cjkCount / CJK_CHARS_PER_MINUTE + latinWords.length / WORDS_PER_MINUTE;
	return Math.max(1, Math.round(minutes));
}

export function satteriReadingTimePlugin(): () => MdastPluginDefinition {
	return () => {
		let done = false;
		return {
			name: "cactus-reading-time",
			text(node, ctx) {
				if (done) return;

				let root: Readonly<Nodes> = node;
				let parent: Readonly<Parents> | undefined = ctx.parent(root);
				while (parent) {
					root = parent;
					parent = ctx.parent(root);
				}

				done = true;
				const textOnPage = mdastToString(root);
				const minutes = estimateReadingMinutes(textOnPage);

				ctx.data.astro!.frontmatter.readingTime = `约 ${minutes} 分钟阅读`;
			},
		};
	};
}

export function satteriUnwrapImagesPlugin(): MdastPluginDefinition {
	return {
		name: "cactus-unwrap-images",
		paragraph(node): Image | undefined {
			const child = node.children[0];
			if (node.children.length === 1 && child?.type === "image") {
				return child;
			}
			return;
		},
	};
}

export function satteriFootnoteLabelPlugin(): HastPluginDefinition {
	return {
		name: "cactus-footnote-label",
		element: {
			filter: ["h2"],
			visit(node, ctx) {
				if (node.properties?.id !== "footnote-label") return;
				ctx.setProperty(node, "className", [""]);
			},
		},
	};
}

export function satteriExternalLinksPlugin(): HastPluginDefinition {
	return {
		name: "cactus-external-links",
		element: {
			filter: ["a"],
			visit(node, ctx) {
				const href = node.properties?.href;
				if (typeof href !== "string" || !href) return;

				let url: URL;
				try {
					url = new URL(href);
				} catch {
					return; // relative path or fragment, not "external"
				}

				if (url.protocol !== "http:" && url.protocol !== "https:") return;

				ctx.setProperty(node, "rel", ["noreferrer", "noopener"]);
				ctx.setProperty(node, "target", "_blank");
			},
		},
	};
}
