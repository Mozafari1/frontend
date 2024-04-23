import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import { IBlog } from "../home/BlogSection";
import getApiUrl from "../../helper/helper";
import Loader from "../../common/loader/Loader";
import ErrorPage from "../../common/error/Error";

const BlogPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [blog, setBlog] = useState<IBlog>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      fetch(`${getApiUrl()}/blog/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch blog data");
          }
          return response.json();
        })
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message); // Set error message
          console.error("Error fetching blog data:", error);
        });
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="blog-page">
      <object type="image/svg+xml" data="/blog-6.svg" aria-label="banner" />
      {blog && (
        <div className="blog-card">
          <div
            className="close-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            &#215;
          </div>
          <img
            src={`./${blog.file_name}`}
            alt={blog.title}
            className="blog-image"
          />

          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-content">{blog.description}</p>
          <p className="blog-content">{blog.sub_description}</p>
          <p className="blog-content">{blog.sub_sub_description}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
