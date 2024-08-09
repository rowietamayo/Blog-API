## Blog App API

### Credentials

#### Admin

##### email: admin@mail.com

##### password: admin123

#### User

##### email: user@mail.com

##### password: user1234

### MERN stack application for a Blog Application with:

##### - Blog Display

##### - Comments

### Features

#### All Users:

##### - All users can to view all available posts.

##### - All users can view a single post

#### Commenting System:

##### - All users must be able to view comments in a single post

##### - Allow users to comment on each blog post.

##### - Comments should be able to refer to which blog post it belongs to.

#### Admin:

##### - Admin allowed to delete any posts.

##### - Admin is allowed to remove any comments.

#### CRUD operations for Blog Users

#### CRUD operations for Admin

#### Authentication and Login

#### User Authentication:

##### - Allow users to register with email, username, and password.

##### - Enable users to log-in securely.

##### - Provide password hashing for secure storage.

#### Blog Post Management:

##### - Create, read, update, and delete (CRUD) operations for blog posts.

##### - Each post have a title, content, author information, and creation date.

##### - Implement authorization to ensure only authenticated users can create, edit, and delete their own posts.

### Endpoints

#### Users

#### [POST] - "/users/login"

#### [POST] - "/users/register"

#### Blogs

#### [POST] - "/blogs/addBlog"

#### [GET] - "/blogs/getBlog"

#### [GET] - "/blogs/getBlog/:blogid"

#### [PATCH] - "/blogs/updateBlog/:blogid"

#### [DELETE] - "/blogs/deleteBlog/:blogid"

#### [POST] - "/blogs/addComment/:blogid"

#### [GET] - "/blogs/getComment/:id"

#### [DELETE] - "/blog/deleteBlogComment/:blogid/:commentid"
