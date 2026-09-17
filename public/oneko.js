// oneko.js: https://github.com/adryd325/oneko.js
// Enhanced with thought bubbles + UI element interaction

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");
  let persistPosition = false;

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  // === Enhanced feature state ===
  let bubbleEl = null;
  let bubbleTimeout = null;
  const sectionCooldowns = {};
  const BUBBLE_COOLDOWN = 30000; // 30s per section
  let isScared = false;
  let hasReachedScareTarget = false;
  let isPerching = false;
  let scrollVelocity = 0;
  let lastScrollY = 0;
  let actualMousePosX = 0;
  let actualMousePosY = 0;

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  // =========================================================
  //  THOUGHT BUBBLE MESSAGES
  // =========================================================

  const sectionMessages = [
    {
      selector: "h1",
      messages: [
        "hi! i'm the office cat 🐱",
        "welcome to hritik's space!",
        "meow~ nice to meet you!",
      ],
    },
    {
      test: function (el) {
        return el.textContent && el.textContent.includes("Skills");
      },
      selector: "section",
      messages: [
        "so many skills... impressed!",
        "python is my fav nap language 😴",
        "ooh, shiny tech!",
      ],
    },
    {
      test: function (el) {
        return (
          el.textContent &&
          (el.textContent.includes("GitHub") ||
            el.textContent.includes("contributions") ||
            el.textContent.includes("Contributions"))
        );
      },
      selector: "section",
      messages: [
        "wow, so many green squares!",
        "someone's been busy...",
        "commit commit commit! 💻",
      ],
    },
    {
      test: function (el) {
        return el.textContent && el.textContent.includes("Projects");
      },
      selector: "section",
      messages: [
        "this one's my favorite!",
        "*chef's kiss* nice work",
        "built with love & coffee ☕",
      ],
    },
    {
      test: function (el) {
        return (
          el.textContent &&
          (el.textContent.includes("Launched") ||
            el.textContent.includes("Products"))
        );
      },
      selector: "section",
      messages: [
        "shipped and deployed 🚀",
        "a builder, not just a talker",
        "real products, real impact!",
      ],
    },
    {
      selector: "footer",
      messages: [
        "don't leave yet!",
        "scroll back up, there's more!",
        "it's cold down here... 🥶",
      ],
    },
  ];

  const idleMessages = [
    "play with me...",
    "*stares at cursor*",
    "pet me? 🥺",
    "*yawns*",
    "is anyone there?",
    "*licks paw*",
    "move the mouse... i dare you",
  ];

  const scareMessages = [
    "user scrolling too fast!! 🙀",
    "running away!! 💨",
    "too fast! taking cover! 🏃‍♂️",
  ];

  const linkClickMessages = [
    "tell them i said hi! 👋",
    "good choice!",
    "bring back snacks! 🐟",
  ];

  // =========================================================
  //  BUBBLE HELPERS
  // =========================================================

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showBubble(text, duration) {
    if (!bubbleEl) return;
    duration = duration || 3000;
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    bubbleEl.textContent = text;
    bubbleEl.style.display = "block";
    updateBubblePosition();
    bubbleTimeout = setTimeout(function () {
      bubbleEl.style.display = "none";
      bubbleTimeout = null;
    }, duration);
  }

  function updateBubblePosition() {
    if (!bubbleEl || bubbleEl.style.display === "none") return;

    var bx = nekoPosX - 40;
    var by = nekoPosY - 54;

    // Clamp horizontally so bubble stays in viewport
    bx = Math.max(4, Math.min(bx, window.innerWidth - 170));
    by = Math.max(4, by);

    // If cat is near the top, show bubble below instead
    if (nekoPosY < 64) {
      by = nekoPosY + 28;
      bubbleEl.classList.add("neko-bubble-below");
    } else {
      bubbleEl.classList.remove("neko-bubble-below");
    }

    bubbleEl.style.left = bx + "px";
    bubbleEl.style.top = by + "px";
  }

  // =========================================================
  //  SECTION PROXIMITY (thought bubbles near page sections)
  // =========================================================

  function checkSectionProximity() {
    // Only check every ~15 frames for performance
    if (frameCount % 15 !== 0) return;

    for (var i = 0; i < sectionMessages.length; i++) {
      var section = sectionMessages[i];
      var el = null;

      if (section.test) {
        var candidates = document.querySelectorAll(section.selector);
        for (var j = 0; j < candidates.length; j++) {
          if (section.test(candidates[j])) {
            el = candidates[j];
            break;
          }
        }
      } else {
        el = document.querySelector(section.selector);
      }

      if (!el) continue;

      var rect = el.getBoundingClientRect();

      // Is the cat within this section's vertical band?
      if (
        nekoPosY > rect.top - 20 &&
        nekoPosY < rect.bottom + 20 &&
        nekoPosX > rect.left - 60 &&
        nekoPosX < rect.right + 60
      ) {
        var key =
          section.selector +
          (section.test ? section.test.toString().slice(0, 30) : "");
        var now = Date.now();

        if (
          !sectionCooldowns[key] ||
          now - sectionCooldowns[key] > BUBBLE_COOLDOWN
        ) {
          sectionCooldowns[key] = now;
          showBubble(randomFrom(section.messages), 3500);
        }
        break; // one section at a time
      }
    }
  }

  // =========================================================
  //  PERCHING — cat sits on headings when idle nearby
  // =========================================================

  function findNearbyPerch() {
    var headings = document.querySelectorAll("h1, h2");
    for (var i = 0; i < headings.length; i++) {
      var rect = headings[i].getBoundingClientRect();
      // Only consider headings visible on screen
      if (rect.top < 0 || rect.bottom > window.innerHeight) continue;

      var cx = rect.left + rect.width / 2;
      var cy = rect.top - 8;
      var dist = Math.sqrt(
        Math.pow(nekoPosX - cx, 2) + Math.pow(nekoPosY - cy, 2)
      );

      if (dist < 120) {
        return { x: cx, y: cy };
      }
    }
    return null;
  }

  // =========================================================
  //  BUTTON COLLISION — cat bats at social link buttons
  // =========================================================

  function checkButtonCollision() {
    // Check every 5 frames
    if (frameCount % 5 !== 0) return;

    var buttons = document.querySelectorAll('a[target="_blank"]');
    var now = Date.now();
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var rect = btn.getBoundingClientRect();

      var overlapping =
        nekoPosX > rect.left - 20 &&
        nekoPosX < rect.right + 20 &&
        nekoPosY > rect.top - 20 &&
        nekoPosY < rect.bottom + 20;

      if (overlapping && !btn.classList.contains("neko-wiggle")) {
        var lastWiggle = parseInt(btn.dataset.nekoLastWiggle || "0", 10);
        // Wait 4 seconds before allowing the same button to wiggle again
        if (now - lastWiggle < 4000) continue;

        btn.classList.add("neko-wiggle");
        btn.dataset.nekoLastWiggle = now.toString();
        
        // 30% chance to show a bat message (avoid spam)
        if (Math.random() < 0.3) {
          showBubble("*bat bat* 🐾", 1500);
        }
        (function (b) {
          setTimeout(function () {
            b.classList.remove("neko-wiggle");
          }, 600);
        })(btn);
      }
    }
  }

  // =========================================================
  //  SCARED — cat runs to corner on fast scroll
  // =========================================================

  function scareCheck() {
    if (scrollVelocity > 200 && !isScared) {
      isScared = true;
      hasReachedScareTarget = false;
      isPerching = false;
      showBubble(randomFrom(scareMessages), 3000);

      // Pick a random corner
      var corners = [
        { x: 40, y: 40 },
        { x: window.innerWidth - 40, y: 40 },
        { x: 40, y: window.innerHeight - 40 },
        { x: window.innerWidth - 40, y: window.innerHeight - 40 },
      ];
      var corner = corners[Math.floor(Math.random() * corners.length)];
      mousePosX = corner.x;
      mousePosY = corner.y;
    }
    // Decay scroll velocity each frame
    scrollVelocity *= 0.75;
  }

  // =========================================================
  //  INIT
  // =========================================================

  function init() {
    var nekoFile = "/oneko.gif";
    var curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(
          curScript.dataset.persistPosition.toLowerCase()
        );
      }
    }

    if (persistPosition) {
      var storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
      }
    }

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = nekoPosX - 16 + "px";
    nekoEl.style.top = nekoPosY - 16 + "px";
    nekoEl.style.zIndex = 2147483647;

    nekoEl.style.backgroundImage = "url(" + nekoFile + ")";

    document.body.appendChild(nekoEl);

    // ---- Thought bubble element ----
    bubbleEl = document.createElement("div");
    bubbleEl.id = "oneko-bubble";
    bubbleEl.style.cssText = [
      "position:fixed",
      "display:none",
      "font-family:'JetBrains Mono',monospace",
      "font-size:11px",
      "font-weight:bold",
      "background:#fff",
      "color:#000",
      "border:2px solid #000",
      "padding:4px 10px",
      "z-index:2147483647",
      "pointer-events:none",
      "max-width:180px",
      "white-space:normal",
      "line-height:1.4",
      "box-shadow:3px 3px 0 #000",
      "transition:opacity 0.15s ease",
    ].join(";");
    document.body.appendChild(bubbleEl);

    // ---- Inject CSS for wiggle + bubble pointer ----
    var style = document.createElement("style");
    style.textContent = [
      ".neko-wiggle {",
      "  animation: nekoWiggle 0.15s ease-in-out 3 !important;",
      "}",
      "@keyframes nekoWiggle {",
      "  0%, 100% { transform: rotate(0deg) translateY(0); }",
      "  25% { transform: rotate(-2.5deg) translateY(-1px); }",
      "  75% { transform: rotate(2.5deg) translateY(-1px); }",
      "}",
      "#oneko-bubble::after {",
      "  content: '';",
      "  position: absolute;",
      "  bottom: -7px;",
      "  left: 14px;",
      "  width: 8px;",
      "  height: 8px;",
      "  background: #fff;",
      "  border-right: 2px solid #000;",
      "  border-bottom: 2px solid #000;",
      "  transform: rotate(45deg);",
      "}",
      "#oneko-bubble.neko-bubble-below::after {",
      "  top: -7px;",
      "  bottom: auto;",
      "  border-right: none;",
      "  border-bottom: none;",
      "  border-left: 2px solid #000;",
      "  border-top: 2px solid #000;",
      "  transform: rotate(45deg);",
      "}",
    ].join("\n");
    document.head.appendChild(style);

    // ---- Event listeners ----
    document.addEventListener("mousemove", function (event) {
      actualMousePosX = event.clientX;
      actualMousePosY = event.clientY;
      if (!isScared) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      }
      if (isPerching) isPerching = false;
    });

    document.addEventListener("touchstart", function (event) {
      if (event.touches.length > 0) {
        actualMousePosX = event.touches[0].clientX;
        actualMousePosY = event.touches[0].clientY;
        if (!isScared) {
          mousePosX = event.touches[0].clientX;
          mousePosY = event.touches[0].clientY;
        }
        if (isPerching) isPerching = false;
      }
    });

    document.addEventListener("touchmove", function (event) {
      if (event.touches.length > 0) {
        actualMousePosX = event.touches[0].clientX;
        actualMousePosY = event.touches[0].clientY;
        if (!isScared) {
          mousePosX = event.touches[0].clientX;
          mousePosY = event.touches[0].clientY;
        }
        if (isPerching) isPerching = false;
      }
    });

    // Link click → cat reacts
    document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest('a[target="_blank"]');
      if (link) {
        showBubble(randomFrom(linkClickMessages), 2500);
      }
    });

    // Scroll velocity tracking
    lastScrollY = window.scrollY;
    window.addEventListener(
      "scroll",
      function () {
        var delta = Math.abs(window.scrollY - lastScrollY);
        scrollVelocity = Math.max(scrollVelocity, delta);
        lastScrollY = window.scrollY;
      },
      { passive: true }
    );

    if (persistPosition) {
      window.addEventListener("beforeunload", function () {
        window.localStorage.setItem(
          "oneko",
          JSON.stringify({
            nekoPosX: nekoPosX,
            nekoPosY: nekoPosY,
            mousePosX: mousePosX,
            mousePosY: mousePosY,
            frameCount: frameCount,
            idleTime: idleTime,
            idleAnimation: idleAnimation,
            idleAnimationFrame: idleAnimationFrame,
            bgPos: nekoEl.style.backgroundPosition,
          })
        );
      });
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  // =========================================================
  //  ANIMATION LOOP
  // =========================================================

  var lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) return;
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    var sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition =
      sprite[0] * 32 + "px " + sprite[1] * 32 + "px";
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  // =========================================================
  //  IDLE — enhanced with perching + thought bubbles
  // =========================================================

  function idle() {
    idleTime += 1;

    // --- Perching: sit on nearby headings when idle long enough ---
    if (idleTime > 5 && !idleAnimation && !isPerching && !isScared) {
      var perch = findNearbyPerch();
      if (perch) {
        isPerching = true;
        mousePosX = perch.x;
        mousePosY = perch.y;
        // Cat will walk to perch via normal movement next frame
      }
    }

    // --- Random idle thought bubbles ---
    if (idleTime > 8 && Math.floor(Math.random() * 80) === 0 && !bubbleTimeout && !isScared) {
      showBubble(randomFrom(idleMessages), 3000);
    }

    // every ~ 20 seconds, pick an idle animation
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      var avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          // Show yawn bubble when falling asleep
          if (idleAnimationFrame === 1 && !bubbleTimeout) {
            showBubble("*yawns* 😴", 2000);
          }
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        // Show zzz bubble once during sleep
        if (idleAnimationFrame === 24 && !bubbleTimeout) {
          showBubble("zzz...", 4000);
        }
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  // =========================================================
  //  FRAME — enhanced with all new checks
  // =========================================================

  function frame() {
    frameCount += 1;

    // Run enhanced feature checks
    scareCheck();
    checkSectionProximity();
    checkButtonCollision();

    var diffX = nekoPosX - mousePosX;
    var diffY = nekoPosY - mousePosY;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distance < nekoSpeed || distance < 48) {
      // Check if we just arrived at the corner while scared
      if (isScared && !hasReachedScareTarget) {
        hasReachedScareTarget = true;
        showBubble("i was so scared... 😿", 3000);
        
        // Stay sitting for 3 seconds, then return to normal
        setTimeout(function () {
          isScared = false;
          hasReachedScareTarget = false;
          mousePosX = actualMousePosX;
          mousePosY = actualMousePosY;
        }, 3000);
      }

      idle();
      updateBubblePosition();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // Show "!" when waking from a long idle
      if (idleTime > 10 && !bubbleTimeout) {
        showBubble("!", 1000);
      }
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      updateBubblePosition();
      return;
    }

    // Reset perching when cat starts chasing cursor
    if (isPerching) isPerching = false;

    var direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = nekoPosX - 16 + "px";
    nekoEl.style.top = nekoPosY - 16 + "px";

    updateBubblePosition();
  }

  init();
})();
