const app = () => {
  const ambient = document.querySelector(".ambient");
  const play = document.querySelector(".play_btn");
  const video = document.querySelector(".video_overlay video");
  const ambient_btn = document.querySelectorAll(".ambient_btn button");
  const timeDisplay = document.querySelector(".count");
  const timeSelect = document.querySelectorAll(".times button");

  let duration = 300;

  play.addEventListener("click", () => {
    playingCheck(ambient);
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}0`;
      ambient.currentTime = 0;
    });
  });

  ambient_btn.forEach((ambient_btn) => {
    ambient_btn.addEventListener("click", function () {
      ambient.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      playingCheck(ambient);
    });
  });

  const playingCheck = (ambient) => {
    if (ambient.paused) {
      ambient.play();
      video.play();
      play.style.background = "url('./images/pausebtn.png')";
    } else {
      ambient.pause();
      video.pause();
      play.style.background = "url('./images/playbtn.png')";
    }
  };

  ambient.ontimeupdate = () => {
    let currentTime = ambient.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= duration) {
      ambient.pause();
      ambient.currentTime = 0;
      play.style.background = "url('./images/playbtn.png')";
      video.pause();
    }
  };
};

app();
