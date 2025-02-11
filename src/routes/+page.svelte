<script lang="ts">
  import { onMount, tick } from "svelte";

  import "../styles/common/common.css";
  import "../styles/modal/loading.css";
  import "../styles/pages/home.css";
  import Background from "./Background.svelte";
  import Loading from "./Loading.svelte";
  import Footer from "./../stories/Footer.svelte";
  import Container from "./../stories/Container.svelte";
  import { navbarVisible } from "$lib/navbarStore";
  import init from 'soj-wasm-api'

  let isLoaded: boolean = false;
  let isAnimationEnded: boolean = false;

  onMount(async () => {
    await tick();

    setTimeout(async () => {
      await init('/assets/soj_wasm_api_bg.wasm');
      isLoaded = true;
    }, 0);
  });

  function handleLoaderFinished() {
    isAnimationEnded = true;
    navbarVisible.set(true);
  }

  // 더미 블로그 포스팅 데이터 (실제 데이터 로딩 방식에 맞게 수정하세요)
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
      content: "",
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
    <div style="margin-top: 115px;">
      <Container>
        <div class="head-container">
          <div class="head-decorations">
            <div class="row1"></div>
            <div class="row2"></div>
          </div>
          <div class="head-text">News</div>
        </div>
        <div class="blog-posts">
          {#if blogPosts.length > 0}
            <!-- 왼쪽(대표 포스트): 제목에 하이퍼링크, 내용(잘림), 태그와 저자 표시 -->
            <div class="featured-post">
              <div class="post-meta">
                <div class="post-tags">
                  {#each blogPosts[0].tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              </div>
              <a href={blogPosts[0].url} class="post-title"
                >{blogPosts[0].title}</a
              >
              <div class="post-date">{blogPosts[0].date.toLocaleString()}</div>
              <div class="post-content">
                {blogPosts[0].content}
              </div>
            </div>

            <!-- 오른쪽(추가 포스트 3건): 제목, 태그, 저자만 표시 -->
            <div class="additional-posts">
              {#each blogPosts.slice(1, 4) as post}
                <div class="additional-post">
                  <div class="post-meta">
                    <div class="post-tags">
                      {#each post.tags as tag}
                        <span class="tag">{tag}</span>
                      {/each}
                    </div>
                  </div>
                  <div class="post-title">{post.title}</div>
                  <div class="post-date">{post.date.toLocaleString()}</div>
                </div>
              {/each}
              <div class="action-buttons">
                <div class="action-button">
                  <span class="material-icons icon action-icon">{"chevron_left"}</span>
                </div>
                <div class="action-button" style="margin-right: 20px;">
                  <span class="material-icons icon action-icon">{"chevron_right"}</span>
                </div>
                <div class="action-button">
                  <span class="material-icons icon action-icon">{"list"}</span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </Container>
    </div>
    <Footer />
  {/if}
{:else}
  <Loading on:finished={handleLoaderFinished} />
{/if}
