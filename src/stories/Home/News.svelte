<script lang="ts">
  import Container from "../Container.svelte";
  import Paragraph from "../Paragraph.svelte";
  import "./news.css";

  interface Props {}

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

<Container>
  <Paragraph name="News">
    <div class="blog-posts" style="margin-bottom: 1rem;">
      {#if blogPosts.length > 0}
        <div class="featured-post">
          <div class="featured-header">
            <div class="post-meta">
              <div class="post-tags">
                <span class="tag featured-tag">
                  <span class="material-icons icon" style="font-size: 14px;"
                    >star</span
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
              <span class="material-icons icon action-icon">chevron_left</span>
            </div>
            <div class="action-button" style="margin-right: 20px;">
              <span class="material-icons icon action-icon">chevron_right</span>
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
