"""Generate AluWorld LTD logo (Direction B, window pane) as pure vector SVG.
The wordmark is drawn from monoline strokes (no fonts), so it renders identically everywhere."""
import os, sys
OUT = sys.argv[1]
INK, SLATE, GLASS, LGLASS, DGLASS, ALU, STEEL, MIST = '#0F1A24','#1F2E3B','#3E7591','#8DB9CF','#2A5468','#C3C9CF','#55626E','#EEF1F3'

H, S = 20.0, 3.2          # cap height, stroke
i = S / 2                  # centreline inset
GAP = 5.2                  # letter spacing

def glyph(ch):
    """Return (width, svg path d) for a cap letter drawn on centrelines, cap height H."""
    if ch == 'A':
        w = 16.4
        lx = lambda y: i + (H - y) / (H - i) * (6.5 - i)
        return w, f'M{i},{H} L6.5,{i} H{w-6.5} L{w-i},{H} M{lx(13.2):.2f},13.2 H{w-lx(13.2):.2f}'
    if ch == 'L':
        w = 12.0
        return w, f'M{i},0 V{H-i} H{w}'
    if ch == 'U':
        w = 15.4; r = (w - 2*i) / 2; y = H - i - r
        return w, f'M{i},0 V{y:.2f} A{r:.2f},{r:.2f} 0 0 0 {w-i},{y:.2f} V0'
    if ch == 'W':
        w = 22.0
        return w, f'M1.0,0 L5.9,{H-i} L11,4.6 L16.1,{H-i} L21.0,0'
    if ch == 'O':
        w = 19.0
        return w, f'M{w/2},{i} A{w/2-i},{H/2-i} 0 1 1 {w/2},{H-i} A{w/2-i},{H/2-i} 0 1 1 {w/2},{i} Z'
    if ch == 'R':
        w = 14.6; r = 4.65
        return w, f'M{i},{H} V{i} H7.4 A{r},{r} 0 0 1 7.4,{i+2*r:.2f} H{i} M7.4,{i+2*r:.2f} L{w-1.2},{H}'
    if ch == 'D':
        w = 16.4; rx = w - i - 7.6; ry = H/2 - i
        return w, f'M{i},{i} H7.6 A{rx:.2f},{ry:.2f} 0 0 1 7.6,{H-i} H{i} Z'
    if ch == 'T':
        w = 12.4
        return w, f'M0,{i} H{w} M{w/2},{i} V{H}'
    raise ValueError(ch)

KERN = {('L','U'): -1.6, ('L','D'): -1.0, ('L','T'): -2.6, ('W','O'): -0.6, ('A','L'): -0.4}

def word(text, x0, y0, scale=1.0):
    parts, x, prev = [], 0.0, None
    for ch in text:
        if prev: x += GAP + KERN.get((prev, ch), 0)
        w, d = glyph(ch)
        parts.append(f'<path transform="translate({x:.2f} 0)" d="{d}"/>')
        x += w; prev = ch
    g = f'<g transform="translate({x0:.2f} {y0:.2f}) scale({scale})">' + ''.join(parts) + '</g>'
    return g, x * scale

ICON_W, ICON_H = 34, 44   # arched-window mark: narrow enough that the lower panes are taller than the arch

def icon_paths(frame, glint, x=0, y=0, s=1.0, simple=False):
    """Arched window: one undivided half-circle fanlight over two tall lower panes."""
    W, Hh = ICON_W, ICON_H
    sw = 3.5 if not simple else 5.2
    o = sw / 2
    r = W / 2 - o            # arch radius on the centreline
    cx, spring = W / 2, o + r  # spring line where the arch meets the straight sides
    p = [f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke-linejoin="miter">',
         f'<path d="M{o} {Hh-o}V{spring}A{r} {r} 0 0 1 {W-o} {spring}V{Hh-o}Z" stroke="{frame}" stroke-width="{sw}"/>',
         f'<path d="M{o} {spring}H{W-o}M{cx} {spring}V{Hh-o}" stroke="{frame}" stroke-width="{sw}"/>']
    if simple:
        p.append(f'<path d="M6.6 38.4L11.6 27.4" stroke="{glint}" stroke-width="4.2"/>')
    else:
        p.append(f'<path d="M6.2 37.6L11.4 26.6" stroke="{glint}" stroke-width="3"/>')
        p.append(f'<path d="M22.6 37.6L27.8 26.6" stroke="{glint}" stroke-width="3"/>')
    p.append('</g>')
    return ''.join(p)

def lockup(fg, glint, ltd, title):
    WX = ICON_W + 14
    wm, ww = word('ALUWORLD', WX, 12)
    lt, lw = word('LTD', WX + ww + 7.0, 12 + H - H*0.6, 0.6)
    width = WX + ww + 7.0 + lw + 1
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.1f} 44" role="img" aria-label="ALUWORLD LTD">'
            f'<title>{title}</title>' + icon_paths(fg, glint) +
            f'<g fill="none" stroke="{fg}" stroke-width="{S}" stroke-linejoin="miter" stroke-miterlimit="2.2" stroke-linecap="butt">{wm}</g>'
            f'<g fill="none" stroke="{ltd}" stroke-width="{S}" stroke-linejoin="miter" stroke-miterlimit="2.2">{lt}</g></svg>')

def square_icon(bg, frame, glint, simple=False, round_bg=False, size=64):
    m = 13 if not simple else 11
    sc = (size - 2*m) / 44
    x = (size - ICON_W*sc) / 2
    rect = (f'<rect width="{size}" height="{size}" rx="{size*0.22:.1f}" fill="{bg}"/>' if round_bg
            else f'<rect width="{size}" height="{size}" fill="{bg}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" role="img" aria-label="ALUWORLD LTD">'
            + rect + icon_paths(frame, glint, x=round(x, 2), y=m, s=round(sc, 4), simple=simple) + '</svg>')

files = {
    'aluworld-logo-v5.svg':          lockup('#F2F5F7', LGLASS, ALU, 'ALUWORLD LTD logo, light on dark'),
    'aluworld-logo-v5-dark.svg':     lockup(INK, GLASS, STEEL, 'ALUWORLD LTD logo, dark on light'),
    'aluworld-logo-v5-mono-ink.svg': lockup(INK, INK, INK, 'ALUWORLD LTD logo, one colour ink'),
    'aluworld-logo-v5-mono-white.svg': lockup('#FFFFFF', '#FFFFFF', '#FFFFFF', 'ALUWORLD LTD logo, one colour white'),
    'aluworld-icon-v5.svg':          square_icon(INK, '#F2F5F7', LGLASS),
    'favicon-v5.svg':                square_icon(INK, '#F2F5F7', LGLASS, simple=True, round_bg=True),
}
os.makedirs(OUT, exist_ok=True)
import re
def tidy(svg):
    return re.sub(r'-?\d+\.\d{3,}', lambda m: ('%.2f' % float(m.group())).rstrip('0').rstrip('.'), svg)
for name, svg in files.items():
    svg = tidy(svg)
    open(os.path.join(OUT, name), 'w').write(svg + '\n')
    print(f'{name:34s} {len(svg):5d} bytes')
