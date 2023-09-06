const fetchData = async (params) => {
  try {
    //todo: anh thấy bỏ / ở cuối đi xong params thêm / ở đâu params thì trông nó oke hơn đó 
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${params}`
    );
    return response.json();
  } catch (error) {
    console.log("🚀 ~ file: hello.js:8 ~ fetchData ~ error:", error);
  }
};

(async () => {
  try {
    // 2. Get data from all users from API above. You will get a list of 10 users.
    const usersData = await fetchData("users");
    console.log("🚀 ~ file: hello.js:8 ~ users:", usersData);

    //3. Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:

    const [posts, comments] = await Promise.all([
      fetchData("posts"),
      fetchData("comments"),
    ]);

    usersData.map((i) => {
      const { company, address, phone, website, ...rest } = i;
      const users = {
        ...rest,
        posts: posts.filter((j) => j.userId === i.id),
        comments: comments.filter((k) => k.email === i.email),
      };
      console.log("🚀 ~ file: hello.js:29 ~ usersData.map ~ user:", users);
    });

    //4. Filter only users with more than 3 comments.
    //todo: đặt tên biến gì đó cho nó tường minh em nhé , chứ đừng đặt i,j như thế này nha . sửa cả ở các hàm khác nữa nha .
    const respon = usersData.map((i) => {
      const { company, address, phone, website, ...rest } = i
      //todo: return luôn nhé không cần tạo thêm biến user đâu 
      const users = {
        ...rest,
        posts: posts.filter((j) => j.userId === i.id),
        comments: comments.filter((k) => k.email === i.email),
      };
      return users;
    });
    console.log(respon.filter((i) => i.comments.length > 3));

    // 5. Reformat the data with the count of comments and posts

    const refactorData = respon.map((i) => {
      const { company, address, phone, website, posts, comments, ...rest } = i;
      const user = {
        ...rest,
        commentsCount: comments.length,
        postsCount: posts.length,
      };
      console.log("🚀 ~ file: hello.js:52 ~ user:", user);
      //todo : return luôn ở trên , bó console.log đi nhé 
      return user;
    });

    // 6.Who is the user with the most comments/posts?
    // most posts
    //todo: bài 6 này thử dừng reduce xem sao nhé 
    const personMostPost = refactorData.sort(
      (a, b) => b.postsCount - a.postsCount
    )[0];

    console.log("🚀 ~ file: hello.js:64 ~ personMostPost:", personMostPost);

    // most comments
    const personMostComments = refactorData.sort(
      (a, b) => b.commentsCount - a.commentsCount
    )[0];

    console.log(
      "🚀 ~ file: hello.js:71 ~ personMostComments:",
      personMostComments
    );

    // 7. Sort the list of users by the postsCount value descending?

    console.log(
      "sort",
      refactorData.sort((a, b) => b.postsCount - a.postsCount)
    );

    // 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request.

    const post1 = await fetchData("posts/1");

    const commentOfPost1 = await fetchData("posts/1/comments");

    const post = {
      ...post1,
      comments: commentOfPost1,
    };
    console.log("🚀 ~ file: hello.js:92 ~ post:", post);
  } catch (error) {
    console.log("🚀 ~ file: hello.js:18 ~ error:", error);
  }
})();
