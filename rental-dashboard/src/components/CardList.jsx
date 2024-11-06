import React from "react";
import CustomCard from "./Card";

const CardList = ({
  data = [],
  handlePageChange,
  handleEdit,
  handleDelete,
  type,
  ButtonText,
  handleApprove,
  handleDecline,
  approveButton,
  declineButton,
}) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
      {data && data.length > 0 ? (
        data.map((data) => (
          <CustomCard
            data={data}
            type={type}
            key={data._id}
            ButtonText={ButtonText}
            handleClick={handlePageChange}
            onEdit={handleEdit}
            handleApprove={handleApprove}
            handleDecline={handleDecline}
            approveButton={approveButton}
            declineButton={declineButton}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default CardList;
