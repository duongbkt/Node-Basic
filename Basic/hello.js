const fetchData = async (params) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com${params}`
    );
    return response.json();
  } catch (error) {
    console.log("🚀 ~ file: hello.js:8 ~ fetchData ~ error:", error);
  }
};

(async () => {
  try {
    // 2. Get data from all users from API above. You will get a list of 10 users.
    const usersData = await fetchData("/users");
    console.log("🚀 ~ file: hello.js:8 ~ users:", usersData);

    //3. Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:

    const [posts, comments] = await Promise.all([
      fetchData("/posts"),
      fetchData("/comments"),
    ]);

    usersData.map((user) => {
      const { company, address, phone, website, ...rest } = user;
      const users = {
        ...rest,
        posts: posts.filter((post) => post.userId === user.id),
        comments: comments.filter((comment) => comment.email === user.email),
      };
      console.log("🚀 ~ file: hello.js:29 ~ usersData.map ~ user:", users);
    });

    //4. Filter only users with more than 3 comments.
    const respon = usersData.map((user) => {
      const { company, address, phone, website, ...rest } = user;
      return {
        ...rest,
        posts: posts.filter((post) => post.userId === user.id),
        comments: comments.filter((comment) => comment.email === user.email),
      };
    });

    // 5. Reformat the data with the count of comments and posts

    const refactorData = respon.map((user) => {
      const { company, address, phone, website, posts, comments, ...rest } =
        user;
      return {
        ...rest,
        commentsCount: comments.length,
        postsCount: posts.length,
      };
    });

    // 6.Who is the user with the most comments/posts?
    // most posts
    //todo: bài 6 này thử dừng reduce xem sao nhé

    const personMostPost = refactorData.reduce((pre, cur) => {
      return cur.postsCount > pre.postsCount ? cur : pre;
    });
    console.log(
      "🚀 ~ file: hello.js:63 ~ personMostPost ~ personMostPost:",
      personMostPost
    );

    // const personMostPost = refactorData.sort(
    //   (a, b) => b.postsCount - a.postsCount
    // )[0];

    // console.log("🚀 ~ file: hello.js:64 ~ personMostPost:", personMostPost);

    // most comments

    const personMostComments = refactorData.reduce((pre, cur) => {
      return cur.commentsCount > pre.commentsCount ? cur : pre;
    });
    console.log(
      "🚀 ~ file: hello.js:63 ~ personMostPost ~ personMostPost:",
      personMostComments
    );

    // const personMostComments = refactorData.sort(
    //   (a, b) => b.commentsCount - a.commentsCount
    // )[0];

    // console.log(
    //   "🚀 ~ file: hello.js:71 ~ personMostComments:",
    //   personMostComments
    // );

    // 7. Sort the list of users by the postsCount value descending?

    console.log(
      "sort",
      refactorData.sort((a, b) => b.postsCount - a.postsCount)
    );

    // 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request.

    const post1 = await fetchData("/posts/1");

    const commentOfPost1 = await fetchData("/posts/1/comments");

    const post = {
      ...post1,
      comments: commentOfPost1,
    };
    console.log("🚀 ~ file: hello.js:92 ~ post:", post);
  } catch (error) {
    console.log("🚀 ~ file: hello.js:18 ~ error:", error);
  }
})();
