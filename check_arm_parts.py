import cv2
import numpy as np

ref = cv2.imread("output_parts/avatar_transparent.png", cv2.IMREAD_UNCHANGED)

# Let's inspect avatar_transparent.png where the left arm (viewer's left) actually is
# The character's right arm (viewer's left) is around x=230..330, y=310..900
arm_crop = ref[300:900, 220:340]
cv2.imwrite("full_left_arm_ref.png", arm_crop)
print("Saved full_left_arm_ref.png, shape:", arm_crop.shape)

# Check left_hand.png from output_parts
hand = cv2.imread("output_parts/left_hand.png", cv2.IMREAD_UNCHANGED)
print("left_hand.png shape:", hand.shape)

# Find where hand.png exists in avatar_transparent.png
res = cv2.matchTemplate(ref, hand, cv2.TM_SQDIFF)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
print(f"Match for left_hand.png: min_loc={min_loc}, min_val={min_val}")

# Also check right_hand.png
rhand = cv2.imread("output_parts/right_hand.png", cv2.IMREAD_UNCHANGED)
res_r = cv2.matchTemplate(ref, rhand, cv2.TM_SQDIFF)
min_val_r, max_val_r, min_loc_r, max_loc_r = cv2.minMaxLoc(res_r)
print(f"Match for right_hand.png: min_loc={min_loc_r}, min_val={min_val_r}")
