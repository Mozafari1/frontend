import React, { useEffect, useState } from "react";
import "../css/Blogs.scss";
import AddEditBlog from "./AddEditBlog";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
interface IBlog {
  id: number;
  title: string;
  description: string;
  updated_at: string;
  created_at: string;
  sub_description: string;
  sub_sub_description: string;
  file_id: number;
  file_name: string;
  file_type: string;
}
const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const handleSuccess = () => {
    fetch(`${getApiUrl()}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  };
  useEffect(() => {
    handleSuccess();
  }, []);

  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [showSortingIcon, setShowSortingIcon] = useState(false);

  const sortByName = () => {
    let newSortOrder: "asc" | "desc" | "default" = "asc";
    if (sortOrder === "asc") {
      newSortOrder = "desc";
    } else if (sortOrder === "desc") {
      newSortOrder = "default";
    }
    const sortedBlogs = [...blogs].sort((a, b) =>
      newSortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : newSortOrder === "desc"
        ? b.title.localeCompare(a.title)
        : 0
    );
    if (newSortOrder === "default") {
      setBlogs(
        blogs.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setBlogs(sortedBlogs);
    }
    setSortOrder(newSortOrder);
    setShowSortingIcon(newSortOrder !== "default");
  };
  const handleAddBlog = () => {
    setState({ is_edit: false, is_open: true });
  };
  const handleEditBlog = () => {
    setState({ is_edit: true, is_open: true });
  };
  const handleCancel = () => {
    setState({ is_edit: false, is_open: false });
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (id: number) => {
    const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
    if (!token || !id) {
      return;
    }
    fetch(`${getApiUrl()}/blog-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };
  return (
    <div className="dashboard-container-blogs">
      <button type="submit" onClick={handleAddBlog}>
        Legg til blogg
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={sortByName}>
                Name{" "}
                <span>
                  {showSortingIcon && (
                    <>
                      {sortOrder === "asc" ? (
                        <i className="fa-solid fa-arrow-down" />
                      ) : (
                        <i className="fa-solid fa-arrow-up" />
                      )}
                    </>
                  )}
                </span>
              </th>
              <th>Beskrivelse</th>
              <th>Publisert</th>
              <th>Sist oppdatert</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{convertDateToLocale(blog.created_at)}</td>
                <td>{convertDateToLocale(blog.updated_at)}</td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      setSelectedBlog(blog);
                      handleEditBlog();
                    }}
                  />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleDeleteBlog(blog.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {state.is_open && (
        <AddEditBlog
          handleCancel={handleCancel}
          is_edit={state.is_edit}
          data={selectedBlog}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
export default Blogs;
