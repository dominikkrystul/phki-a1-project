"""Package the built static site and reviewed supporting documents, without network access."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

presentation = Path(__file__).resolve().parents[1]
site = presentation / '.site'
pdf = presentation / 'output/pdf/phki-responsibility-presentation.pdf'
motion = presentation / 'output/phki-v3-motion-review.mp4'
if not (site / 'presentation/index.html').is_file() or not pdf.is_file():
    raise SystemExit('Build/package the site and generate the reviewed PDF before creating the archive.')

readme = '''PHKI - When AI writes the code.

1. Unzip this archive.
2. In Terminal, change into this extracted folder.
3. Run: python3 -m http.server 8000 --bind 127.0.0.1
4. Open http://127.0.0.1:8000/presentation/

No internet or npm installation needed. Keep the local server running.
Use a local HTTP server, not file://.

Right/Space: next step. Left: previous. 1-7: scene. F: fullscreen.
P: pause/resume security camera. Escape: exit fullscreen. T: start/pause timer. R: restart. H: controls.
Start timer with your first spoken word. Target 5:30; hard limit 6:00.

Speaker script: docs/speaker-notes.md
Static fallback: pdf/phki-responsibility-presentation.pdf
Sampled motion review: motion/phki-v3-motion-review.mp4
Verification/limits: docs/validation.md

The original fictional portal is at /. Its public demo viewer is at /database.html.
The presentation uses a faithful representation and fixed illustrative JSON, not real authentication.
No deployment or timed speaking rehearsal has been performed.
Source code lives in the accompanying repository under presentation/.
'''
output = presentation / 'output/phki-presentation-offline.zip'
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(site.rglob('*')):
        if path.is_file():
            archive.write(path, path.relative_to(site))
    for path in sorted((presentation / 'docs').glob('*.md')):
        archive.write(path, 'docs/' + path.name)
    archive.write(pdf, 'pdf/' + pdf.name)
    archive.write(presentation / 'README.md', 'README.md')
    if motion.is_file():
        archive.write(motion, 'motion/' + motion.name)
    archive.writestr('README.txt', readme)
print(output)
