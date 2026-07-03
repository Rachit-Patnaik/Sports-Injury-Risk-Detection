import cv2

video_path = "videos/running.mp4"

video = cv2.VideoCapture(video_path)

if not video.isOpened():
    print("Error opening video")
    exit()

print("Video opened successfully!")

while True:

    ret, frame = video.read()

    if not ret:
        print("End of video")
        break

    cv2.imshow("Sports Injury Detection", frame)

    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()

print("Finished")