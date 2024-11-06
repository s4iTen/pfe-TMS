import { useNavigate } from "react-router-dom";

export function useProperty(url) {
  const navigate = useNavigate();

  const handleEdit = (_id) => {
    console.log(`Edit clicked for property ID: ${_id}`);
  };

  const handleDelete = (_id) => {
    console.log(`Delete clicked for property ID: ${_id}`);
  };
  const handlePageChange = (_id) => {
    navigate(`/${url}/${_id}`);
  };
  return { handleEdit, handleDelete, handlePageChange };
}
