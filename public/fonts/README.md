# Bundled fonts

Both fonts are bundled to keep the app typography available without contacting
external font providers. The copyright notices and SIL Open Font License texts
are distributed alongside the font files.

- `PretendardVariable.woff2`: unmodified Pretendard v1.3.9 variable font, from
  https://raw.githubusercontent.com/orioncactus/pretendard/v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2
  License: `Pretendard-LICENSE.txt`.
- `GowunBatang-Regular.woff2`: lossless WOFF2 packaging of the complete regular
  font served by Google Fonts v12 at
  https://fonts.gstatic.com/s/gowunbatang/v12/ijwSs5nhRMIjYsdSgcMa3wRhXA.ttf
  Converted using FontTools 4.63.0 and Brotli 1.2.1, without glyph subsetting or
  design changes. License: `GowunBatang-OFL.txt`, sourced from
  https://raw.githubusercontent.com/google/fonts/main/ofl/gowunbatang/OFL.txt

To reproduce the format conversion in an isolated Python environment with those
packages installed:

```python
from fontTools.ttLib import TTFont

font = TTFont("GowunBatang-Regular.ttf")
font.flavor = "woff2"
font.save("GowunBatang-Regular.woff2")
```
