#!/usr/bin/env python3

import argparse
import os
import re
import sys
from typing import List, Tuple

try:
	from reportlab.lib.pagesizes import LETTER
	from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
	from reportlab.lib import colors
	from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, PageBreak, Preformatted
	from reportlab.lib.units import inch
	from reportlab.pdfbase import pdfmetrics
	from reportlab.pdfbase.ttfonts import TTFont
except Exception as exc:
	print("ReportLab is required. Install with: pip install reportlab", file=sys.stderr)
	raise


def convert_inline_markdown_to_html(text: str) -> str:
	"""Convert a small subset of inline Markdown to ReportLab's paragraph markup.

	Supported: bold **text**, italic *text*, inline code `code`, links [text](url).
	"""
	# Escape ampersands and angle brackets first to avoid interfering with tags
	text = (text
		.replace("&", "&amp;")
		.replace("<", "&lt;")
		.replace(">", "&gt;")
	)

	# Links: [text](url)
	text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<link href="\2">\1</link>', text)

	# Bold: **text** (greedy-safe)
	text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)

	# Italic: *text*
	text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", text)

	# Inline code: `code`
	text = re.sub(r"`([^`]+)`", r"<font face='Courier'>\1</font>", text)

	return text


def parse_markdown(md: str) -> List:
	"""Very small Markdown parser that emits ReportLab flowables.

	Handles headings (#, ##, ###), paragraphs, bullet/ordered lists, fenced code blocks, and simple inline markup.
	"""
	styles = getSampleStyleSheet()

	# Base styles
	title_style = ParagraphStyle(
		name="Title",
		parent=styles["Title"],
		fontName="Helvetica-Bold",
		fontSize=24,
		leading=28,
		spaceAfter=18,
	)
	h1_style = ParagraphStyle(
		name="Heading1",
		parent=styles["Heading1"],
		fontName="Helvetica-Bold",
		fontSize=18,
		leading=22,
		spaceBefore=12,
		spaceAfter=8,
	)
	h2_style = ParagraphStyle(
		name="Heading2",
		parent=styles["Heading2"],
		fontName="Helvetica-Bold",
		fontSize=15,
		leading=19,
		spaceBefore=10,
		spaceAfter=6,
	)
	h3_style = ParagraphStyle(
		name="Heading3",
		parent=styles["Heading3"],
		fontName="Helvetica-Bold",
		fontSize=13,
		leading=16,
		spaceBefore=8,
		spaceAfter=4,
	)
	body_style = ParagraphStyle(
		name="Body",
		parent=styles["BodyText"],
		fontName="Helvetica",
		fontSize=10.5,
		leading=14,
		spaceAfter=6,
	)
	bullet_style = ParagraphStyle(
		name="Bullet",
		parent=body_style,
		leftIndent=14,
		bulletFontName="Helvetica",
		bulletFontSize=10.5,
	)
	code_style = ParagraphStyle(
		name="Code",
		parent=styles["Code"] if "Code" in styles else styles["BodyText"],
		fontName="Courier",
		fontSize=9.5,
		leading=12,
		backColor=colors.whitesmoke,
		borderPadding=6,
		spaceBefore=6,
		spaceAfter=6,
	)

	flow = []
	lines = md.splitlines()
	in_code_block = False
	code_block_lang = ""
	code_buffer: List[str] = []
	list_buffer: List[Tuple[str, str]] = []  # (type: "ul"|"ol", text)
	title_used = False

	def flush_paragraph(paragraph_lines: List[str]):
		if not paragraph_lines:
			return
		text = " ".join(x.strip() for x in paragraph_lines).strip()
		if not text:
			return
		flow.append(Paragraph(convert_inline_markdown_to_html(text), body_style))

	def flush_list():
		nonlocal list_buffer
		if not list_buffer:
			return
		list_type = list_buffer[0][0]
		items = []
		for _typ, item_text in list_buffer:
			para = Paragraph(convert_inline_markdown_to_html(item_text), body_style)
			items.append(ListItem(para))
		flow.append(ListFlowable(items, bulletType='bullet' if list_type == 'ul' else '1', start='1', leftIndent=18))
		list_buffer = []

	paragraph_lines: List[str] = []

	for raw_line in lines:
		line = raw_line.rstrip("\n")

		# Handle fenced code blocks
		fence_match = re.match(r"^```(.*)$", line)
		if fence_match:
			if not in_code_block:
				# starting a code block
				in_code_block = True
				code_block_lang = fence_match.group(1).strip()
				flush_paragraph(paragraph_lines)
				paragraph_lines = []
				flush_list()
				code_buffer = []
				continue
			else:
				# ending a code block
				in_code_block = False
				flush_list()
				code_text = "\n".join(code_buffer)
				flow.append(Preformatted(code_text, code_style))
				code_buffer = []
				continue

		if in_code_block:
			code_buffer.append(raw_line)
			continue

		# Horizontal rule as simple spacer
		if re.fullmatch(r"\s*---+\s*", line or ""):
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			flush_list()
			flow.append(Spacer(1, 0.2 * inch))
			continue

		# Headings
		h1 = re.match(r"^#\s+(.+)$", line)
		h2 = re.match(r"^##\s+(.+)$", line)
		h3 = re.match(r"^###\s+(.+)$", line)
		if h1 and not h2 and not h3:
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			flush_list()
			heading = h1.group(1).strip()
			style = title_style if not title_used else h1_style
			title_used = True
			flow.append(Paragraph(convert_inline_markdown_to_html(heading), style))
			continue
		elif h2 and not h3:
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			flush_list()
			heading = h2.group(1).strip()
			flow.append(Paragraph(convert_inline_markdown_to_html(heading), h2_style))
			continue
		elif h3:
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			flush_list()
			heading = h3.group(1).strip()
			flow.append(Paragraph(convert_inline_markdown_to_html(heading), h3_style))
			continue

		# Lists
		ul = re.match(r"^\s*[-\*]\s+(.+)$", line)
		ol = re.match(r"^\s*\d+\.\s+(.+)$", line)
		if ul or ol:
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			text = (ul or ol).group(1).strip()
			list_buffer.append(("ul" if ul else "ol", text))
			continue
		else:
			# If a list was ongoing and we hit a blank line or non-list, flush it
			if list_buffer and (not line.strip()):
				flush_list()
				continue

		# Blank line breaks paragraph
		if not line.strip():
			flush_paragraph(paragraph_lines)
			paragraph_lines = []
			continue

		# Accumulate paragraph text
		paragraph_lines.append(line)

	# Final flushes
	flush_paragraph(paragraph_lines)
	flush_list()
	if in_code_block and code_buffer:
		flow.append(Preformatted("\n".join(code_buffer), code_style))

	return flow


def build_pdf(input_md: str, output_pdf: str, page_size=LETTER):
	with open(input_md, "r", encoding="utf-8") as f:
		md = f.read()

	doc = SimpleDocTemplate(
		output_pdf,
		pagesize=page_size,
		leftMargin=0.8 * inch,
		rightMargin=0.8 * inch,
		topMargin=0.8 * inch,
		bottomMargin=0.8 * inch,
		title=os.path.basename(input_md),
	)

	story = parse_markdown(md)
	# Add a little breathing room at end
	story.append(Spacer(1, 0.25 * inch))

	doc.build(story)


def main():
	parser = argparse.ArgumentParser(description="Convert Markdown to PDF (subset) using ReportLab.")
	parser.add_argument("input_md", help="Path to input Markdown file")
	parser.add_argument("output_pdf", help="Path to output PDF file")
	args = parser.parse_args()

	if not os.path.isfile(args.input_md):
		print(f"Input not found: {args.input_md}", file=sys.stderr)
		sys.exit(2)

	os.makedirs(os.path.dirname(args.output_pdf) or ".", exist_ok=True)

	build_pdf(args.input_md, args.output_pdf)
	print(f"Wrote PDF: {args.output_pdf}")


if __name__ == "__main__":
	main()