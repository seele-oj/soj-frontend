<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  import "../styles/common/common.css";
  import "../styles/modal/loading.css";
  import "../styles/pages/home.css";
  import Background from "./Background.svelte";
  import Loading from "./Loading.svelte";
  import Footer from "./../stories/Footer.svelte";
  import Container from "./../stories/Container.svelte";
  import Paragraph from "./../stories/Paragraph.svelte";
  import { navbarVisible } from "$lib/navbarStore";
  import init from "soj-wasm-api";

  let isLoaded: boolean = false;
  let isAnimationEnded: boolean = false;
  // 타이핑 애니메이션 시작 여부 (중복 실행 방지)
  let typingStarted: boolean = false;

  const typing_text1: string = "모두를";
  const typing_text2: string = "위한";
  const typing_text3: string = "온라인저지";

  // 각 줄을 문자 배열로 관리
  let line1: string[] = [];
  let line2: string[] = [];
  let line3: string[] = [];

  onMount(async () => {
    await tick();
    setTimeout(async () => {
      await init("/assets/soj_wasm_api_bg.wasm");
      isLoaded = true;
    }, 0);
  });

  function handleLoaderFinished() {
    isAnimationEnded = true;
    navbarVisible.set(true);
  }

  // ----------------------
  // 타이핑 애니메이션 함수 (문자 배열 방식)
  // ----------------------
  // 한 텍스트를 문자 단위 배열에 추가하면서 출력 (딜레이: 50ms)
  async function typeTextArray(
    fullText: string,
    updateFn: (arr: string[]) => void,
    delay: number = 50
  ) {
    let arr: string[] = [];
    for (let i = 0; i < fullText.length; i++) {
      arr.push(fullText[i]);
      updateFn([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // 세 개의 텍스트를 순차적으로 출력
  async function typeAllText() {
    await typeTextArray(typing_text1, (arr) => (line1 = arr));
    await typeTextArray(typing_text2, (arr) => (line2 = arr));
    await typeTextArray(typing_text3, (arr) => (line3 = arr));
  }

  // isAnimationEnded가 true가 된 후 한 번만 타이핑 애니메이션을 실행하도록 함
  $: if (isAnimationEnded && !typingStarted) {
    typingStarted = true;
    tick().then(() => {
      typeAllText();
    });
  }

  // ----------------------
  // 더미 블로그 포스팅 데이터 (실제 데이터 로딩 방식에 맞게 수정하세요)
  // ----------------------
  type BlogPost = {
    title: string;
    content: string;
    tags: string[];
    date: Date;
    url: string;
  };

  let blogPosts: BlogPost[] = [
    {
      title: "제1회 제레컵 개최",
      content: "젤랠래젤랠래젤랠래젤랠래젤랠래젤랠래젤랠래젤랠래",
      tags: ["Contest"],
      date: new Date(2025, 2, 11, 7, 0, 0, 0),
      url: "/blog/featured-post",
    },
    {
      title: "20250211 서버 점검 안내",
      content: "Short summary of post 2.",
      tags: ["Update", "Announcement"],
      date: new Date(2025, 2, 11, 7, 0, 0, 0),
      url: "/blog/post-2",
    },
    {
      title: "SeeleOJ 오픈 안내",
      content: "Short summary of post 3.",
      tags: ["Update"],
      date: new Date(2025, 2, 11, 7, 0, 0, 0),
      url: "/blog/post-3",
    },
    {
      title: "SeeleOJ 이용 약관",
      content: "Short summary of post 4.",
      tags: ["Announcement"],
      date: new Date(2025, 2, 11, 7, 0, 0, 0),
      url: "/blog/post-4",
    },
  ];
</script>

<Background />
{#if isLoaded}
  {#if isAnimationEnded}
    <div class="home-head">
      <div class="head-logo">
        <div class="show-small">
          <div class="is-dark-mode">
            <div class="home-logo">
              <img
                src="/seele-oj-logo_bright.svg"
                draggable="false"
                alt="Logo"
              />
            </div>
          </div>
          <div class="is-not-dark-mode">
            <div class="home-logo">
              <img src="/seele-oj-logo_dark.svg" draggable="false" alt="Logo" />
            </div>
          </div>
        </div>
      </div>
      <!-- 타이핑 애니메이션이 적용되는 영역 -->
      <div
        class="atext1"
        style="top: 50%; left: 50%; transform: translate(-50%,-50%)"
      >
        <span>
          {#each line1 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length !== typing_text1.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br />
        <span>
          {#each line2 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length === typing_text1.length && line2.length !== typing_text2.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br />
        <span>
          {#each line3 as char, index (index)}
            <span in:fade>{char}</span>
          {/each}
          {#if line1.length === typing_text1.length && line2.length === typing_text2.length && line3.length !== typing_text3.length}
            <span class="cursor">|</span>
          {/if}
        </span>
        <br /><br />
        <div class="seele-oj-logo" style="display: table-cell;">
          <img
            style="height: auto; width: 30px; float: left; margin-right: 10px;"
            src="/flowers.svg"
            draggable="false"
            alt="Logo"
          />
          <div class="seele-oj-title" style="float: right; font-size: 24px;">SeeleOJ</div>
        </div>
      </div>
    </div>
    <div style="margin-top: 500px;">
      <Container>
        <Paragraph name="News">
          <div class="blog-posts" style="margin-bottom: 1rem;">
            {#if blogPosts.length > 0}
              <div class="featured-post">
                <div class="featured-header">
                  <div class="post-meta">
                    <div class="post-tags">
                      <span class="tag featured-tag">
                        <span
                          class="material-icons icon"
                          style="font-size: 14px;">star</span
                        >
                      </span>
                      {#each blogPosts[0].tags as tag}
                        <span class="tag">{tag}</span>
                      {/each}
                    </div>
                  </div>
                  <a href={blogPosts[0].url} class="post-title">
                    {blogPosts[0].title}
                  </a>
                </div>
                <div class="post-date">
                  {blogPosts[0].date.toLocaleString()}
                </div>
                <div class="post-content">
                  {blogPosts[0].content}
                </div>
                <div class="bar"></div>
              </div>

              <div class="additional-posts">
                {#each blogPosts.slice(1, 4) as post}
                  <div class="additional-post">
                    <div class="additional-header">
                      <div class="post-meta">
                        <div class="post-tags">
                          {#each post.tags as tag}
                            <span class="tag">{tag}</span>
                          {/each}
                        </div>
                      </div>
                      <a href={post.url} class="post-title">
                        {post.title}
                      </a>
                    </div>
                    <div class="post-date">{post.date.toLocaleString()}</div>
                    <div class="bar"></div>
                  </div>
                {/each}
                <div class="action-buttons">
                  <div class="action-button">
                    <span class="material-icons icon action-icon"
                      >chevron_left</span
                    >
                  </div>
                  <div class="action-button" style="margin-right: 20px;">
                    <span class="material-icons icon action-icon"
                      >chevron_right</span
                    >
                  </div>
                  <div class="action-button">
                    <span class="material-icons icon action-icon">list</span>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </Paragraph>
      </Container>
    </div>
    <Footer />
  {/if}
{:else}
  <Loading on:finished={handleLoaderFinished} />
{/if}
