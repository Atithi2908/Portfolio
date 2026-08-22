"use client";

import React, { forwardRef } from "react";

/*──────────────────────────────────────────────────────────────────────────────
 * Color palette — matches the avatar PNG exactly
 *────────────────────────────────────────────────────────────────────────────*/
const SKIN        = "#C4956A";
const SKIN_SHADOW = "#B08058";
const SKIN_HI     = "#D4A676";
const HAIR        = "#2A2220";
const HAIR_HI     = "#3D332D";
const EYE_WHITE   = "#F5F0EB";
const IRIS        = "#5C3A1E";
const PUPIL       = "#1A1008";
const SHIRT       = "#2C2C30";
const SHIRT_DARK  = "#232328";
const SHIRT_HI    = "#353538";
const PANTS       = "#2E2E35";
const PANTS_DARK  = "#272730";
const SHOES       = "#1C1C20";
const SHOES_HI    = "#282828";
const MOUTH_LINE  = "#9A6850";

interface CharacterSVGProps {
  className?: string;
  style?: React.CSSProperties;
}

const CharacterSVG = forwardRef<SVGSVGElement, CharacterSVGProps>(
  ({ className, style }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        {/* ─── Gradient Definitions ─── */}
        <defs>
          <linearGradient id="char-skin" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor={SKIN_HI} />
            <stop offset="100%" stopColor={SKIN} />
          </linearGradient>
          <linearGradient id="char-shirt" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor={SHIRT_HI} />
            <stop offset="60%" stopColor={SHIRT} />
            <stop offset="100%" stopColor={SHIRT_DARK} />
          </linearGradient>
          <linearGradient id="char-pants" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor={PANTS} />
            <stop offset="100%" stopColor={PANTS_DARK} />
          </linearGradient>
          <linearGradient id="char-hair" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={HAIR_HI} />
            <stop offset="100%" stopColor={HAIR} />
          </linearGradient>
        </defs>

        {/* ═══════════════════════════════════════════════════════════════════
            ROOT
            ═══════════════════════════════════════════════════════════════ */}
        <g data-part="root">
          {/* ─── HIPS ─── */}
          <g data-part="hips">

            {/* LEFT LEG */}
            <g data-part="left-upper-leg">
              <path
                d="M 160 355 C 157 358 152 370 150 410 L 148 505
                   C 148 510 152 512 158 512
                   L 182 512 C 188 512 192 510 192 505
                   L 190 410 C 188 370 185 358 182 355 Z"
                fill="url(#char-pants)"
              />
              <g data-part="left-lower-leg">
                <path
                  d="M 150 508 C 149 520 147 560 146 600 L 145 638
                     C 145 643 149 646 155 646
                     L 183 646 C 189 646 193 643 193 638
                     L 192 600 C 191 560 189 520 188 508 Z"
                  fill={PANTS}
                />
                <g data-part="left-foot">
                  <path
                    d="M 143 640 L 142 660 C 141 670 145 678 158 680
                       L 180 680 C 190 678 194 672 193 662
                       L 192 640 Z"
                    fill={SHOES}
                  />
                  <path
                    d="M 140 672 C 140 682 148 690 165 692
                       L 178 690 C 192 686 196 678 195 670
                       L 192 672 Z"
                    fill="#141416"
                  />
                  <path
                    d="M 150 658 L 185 658"
                    stroke={SHOES_HI}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>

            {/* RIGHT LEG */}
            <g data-part="right-upper-leg">
              <path
                d="M 218 355 C 215 358 210 370 208 410 L 208 505
                   C 208 510 212 512 218 512
                   L 242 512 C 248 512 252 510 252 505
                   L 250 410 C 248 370 245 358 242 355 Z"
                fill="url(#char-pants)"
              />
              <g data-part="right-lower-leg">
                <path
                  d="M 210 508 C 209 520 208 560 207 600 L 207 638
                     C 207 643 211 646 217 646
                     L 245 646 C 251 646 255 643 255 638
                     L 254 600 C 253 560 252 520 250 508 Z"
                  fill={PANTS}
                />
                <g data-part="right-foot">
                  <path
                    d="M 205 640 L 205 660 C 204 670 208 678 220 680
                       L 244 680 C 254 678 258 672 257 662
                       L 256 640 Z"
                    fill={SHOES}
                  />
                  <path
                    d="M 203 672 C 203 682 210 690 228 692
                       L 242 690 C 256 686 260 678 259 670
                       L 256 672 Z"
                    fill="#141416"
                  />
                  <path
                    d="M 215 658 L 248 658"
                    stroke={SHOES_HI}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>

            {/* ═══════════════════════════════════════════════════════════════
                UPPER BODY
                ═══════════════════════════════════════════════════════════ */}
            <g data-part="upper-body">

              {/* LEFT ARM */}
              <g data-part="left-upper-arm">
                <path
                  d="M 142 178 C 136 180 126 188 120 210
                     L 116 268 C 116 274 122 278 130 276
                     L 142 272 C 146 270 148 262 148 255
                     L 148 195 Z"
                  fill="url(#char-shirt)"
                />
                <g data-part="left-lower-arm">
                  <path
                    d="M 117 270 C 115 285 112 315 110 350
                       L 108 368 C 108 374 112 376 118 376
                       L 136 374 C 140 372 142 368 142 362
                       L 142 310 C 142 290 143 275 144 270 Z"
                    fill="url(#char-skin)"
                  />
                  <g data-part="left-hand">
                    <path
                      d="M 108 368 C 106 374 104 384 106 393
                         C 108 402 114 408 122 408
                         C 130 408 136 400 138 392
                         C 140 384 138 374 136 368 Z"
                      fill={SKIN}
                    />
                    <path
                      d="M 112 392 L 114 400 M 118 394 L 120 403
                         M 124 394 L 126 402 M 130 392 L 131 399"
                      stroke={SKIN_SHADOW}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </g>

              {/* TORSO */}
              <path
                data-part="torso-shape"
                d="M 145 175 C 142 178 138 185 136 200
                   L 132 310 C 130 335 135 355 145 362
                   L 255 362 C 265 355 270 335 268 310
                   L 264 200 C 262 185 258 178 255 175
                   L 230 167 C 218 163 182 163 170 167 Z"
                fill="url(#char-shirt)"
              />
              <path
                d="M 145 358 L 255 358"
                stroke={PANTS_DARK}
                strokeWidth="3"
              />
              <path
                d="M 200 168 L 200 225"
                stroke={SHIRT_DARK}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx={200} cy={180} r={2.5} fill={SHIRT_DARK} />
              <circle cx={200} cy={195} r={2.5} fill={SHIRT_DARK} />
              <path
                data-part="collar"
                d="M 185 162 L 175 168 C 172 172 175 178 182 180
                   L 195 172 L 200 168 L 205 172 L 218 180
                   C 225 178 228 172 225 168 L 215 162
                   C 210 158 190 158 185 162 Z"
                fill={SHIRT_HI}
              />

              {/* RIGHT ARM */}
              <g data-part="right-upper-arm">
                <path
                  d="M 258 178 C 264 180 274 188 280 210
                     L 284 268 C 284 274 278 278 270 276
                     L 258 272 C 254 270 252 262 252 255
                     L 252 195 Z"
                  fill="url(#char-shirt)"
                />
                <g data-part="right-lower-arm">
                  <path
                    d="M 283 270 C 285 285 288 315 290 350
                       L 292 368 C 292 374 288 376 282 376
                       L 264 374 C 260 372 258 368 258 362
                       L 258 310 C 258 290 257 275 256 270 Z"
                    fill="url(#char-skin)"
                  />
                  <g data-part="right-hand">
                    <path
                      d="M 292 368 C 294 374 296 384 294 393
                         C 292 402 286 408 278 408
                         C 270 408 264 400 262 392
                         C 260 384 262 374 264 368 Z"
                      fill={SKIN}
                    />
                    <path
                      d="M 288 392 L 286 400 M 282 394 L 280 403
                         M 276 394 L 274 402 M 270 392 L 269 399"
                      stroke={SKIN_SHADOW}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </g>

              {/* ═══════════════════════════════════════════════════════════
                  NECK + HEAD GROUP
                  ═════════════════════════════════════════════════════════ */}
              <g data-part="neck-group">
                <path
                  data-part="neck-shape"
                  d="M 188 148 C 186 152 184 158 184 165
                     L 216 165 C 216 158 214 152 212 148 Z"
                  fill="url(#char-skin)"
                />

                {/* ─── HEAD ─── */}
                <g data-part="head">
                  <path
                    data-part="face"
                    d="M 200 148 C 175 148 152 132 150 100
                       C 148 68 165 40 200 38
                       C 235 40 252 68 250 100
                       C 248 132 225 148 200 148 Z"
                    fill="url(#char-skin)"
                  />

                  {/* Ears */}
                  <ellipse cx={150} cy={96} rx={8} ry={15} fill={SKIN} />
                  <ellipse cx={150} cy={96} rx={5} ry={10} fill={SKIN_SHADOW} />
                  <ellipse cx={250} cy={96} rx={8} ry={15} fill={SKIN} />
                  <ellipse cx={250} cy={96} rx={5} ry={10} fill={SKIN_SHADOW} />

                  {/* ── LEFT EYE ── */}
                  <g data-part="left-eye">
                    <ellipse cx={180} cy={92} rx={14} ry={9} fill={EYE_WHITE} />
                    
                    {/* Isolated Left Gaze Group */}
                    <g data-part="left-gaze">
                      <circle
                        data-part="left-iris"
                        cx={182}
                        cy={92}
                        r={6}
                        fill={IRIS}
                      />
                      <circle
                        data-part="left-pupil"
                        cx={182}
                        cy={92}
                        r={3}
                        fill={PUPIL}
                      />
                      <circle cx={184} cy={89} r={1.5} fill="white" opacity={0.85} />
                    </g>

                    <ellipse
                      data-part="left-eyelid"
                      cx={180}
                      cy={92}
                      rx={15}
                      ry={10}
                      fill={SKIN}
                    />
                    <ellipse
                      cx={180}
                      cy={92}
                      rx={14}
                      ry={9}
                      fill="none"
                      stroke={HAIR}
                      strokeWidth="1.4"
                    />
                  </g>

                  {/* ── RIGHT EYE ── */}
                  <g data-part="right-eye">
                    <ellipse cx={220} cy={92} rx={14} ry={9} fill={EYE_WHITE} />
                    
                    {/* Isolated Right Gaze Group */}
                    <g data-part="right-gaze">
                      <circle
                        data-part="right-iris"
                        cx={218}
                        cy={92}
                        r={6}
                        fill={IRIS}
                      />
                      <circle
                        data-part="right-pupil"
                        cx={218}
                        cy={92}
                        r={3}
                        fill={PUPIL}
                      />
                      <circle cx={220} cy={89} r={1.5} fill="white" opacity={0.85} />
                    </g>

                    <ellipse
                      data-part="right-eyelid"
                      cx={220}
                      cy={92}
                      rx={15}
                      ry={10}
                      fill={SKIN}
                    />
                    <ellipse
                      cx={220}
                      cy={92}
                      rx={14}
                      ry={9}
                      fill="none"
                      stroke={HAIR}
                      strokeWidth="1.4"
                    />
                  </g>

                  {/* NOSE */}
                  <path
                    data-part="nose"
                    d="M 197 104 C 195 108 194 115 198 118
                       C 200 120 202 120 204 118
                       C 208 115 206 108 204 104"
                    fill="none"
                    stroke={SKIN_SHADOW}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* MOUTH */}
                  <g data-part="mouth">
                    <path
                      d="M 188 128 C 192 133 197 135 200 135
                         C 203 135 208 133 212 128"
                      fill="none"
                      stroke={MOUTH_LINE}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 190 127 C 195 125 200 124 200 124
                         C 200 124 205 125 210 127"
                      fill="none"
                      stroke={SKIN_SHADOW}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* MUSTACHE */}
                  <path
                    d="M 191 122 C 195 120 198 119 200 119
                       C 202 119 205 120 209 122
                       C 206 123 203 124 200 123.5
                       C 197 124 194 123 191 122 Z"
                    fill={HAIR}
                    opacity={0.65}
                  />

                  {/* EYEBROWS */}
                  <path
                    data-part="left-eyebrow"
                    d="M 166 78 C 170 73 178 71 192 75"
                    fill="none"
                    stroke={HAIR}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    data-part="right-eyebrow"
                    d="M 234 78 C 230 73 222 71 208 75"
                    fill="none"
                    stroke={HAIR}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* HAIR */}
                  <g data-part="hair">
                    <path
                      d="M 150 95 C 148 72 152 50 168 38
                         C 180 30 195 25 210 26
                         C 230 28 248 38 252 60
                         C 254 72 253 88 252 95
                         C 250 82 248 65 240 52
                         C 232 42 220 36 200 35
                         C 180 36 168 44 162 55
                         C 155 66 152 80 150 95 Z"
                      fill="url(#char-hair)"
                    />
                    <path
                      d="M 162 48 C 168 30 185 20 205 22
                         C 225 24 240 30 248 42
                         C 252 48 252 55 248 52
                         C 240 38 225 30 205 28
                         C 185 27 170 34 165 45
                         Z"
                      fill={HAIR}
                    />
                    <path
                      d="M 150 92 C 148 80 150 65 156 55
                         C 152 62 150 75 150 92 Z"
                      fill={HAIR_HI}
                      opacity={0.5}
                    />
                    <path
                      d="M 175 32 C 178 26 188 22 195 24
                         M 200 25 C 208 22 218 24 225 30
                         M 165 42 C 168 35 178 30 188 28"
                      fill="none"
                      stroke={HAIR}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity={0.4}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
);

CharacterSVG.displayName = "CharacterSVG";
export default CharacterSVG;
