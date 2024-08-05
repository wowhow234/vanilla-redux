import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = ({ toDos }) => {
  const myId = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(myId));
  // console.log(myId);
  // console.log(typeof myId);
  console.log("toDos----", toDos);
  console.log("toDo-----", toDo);

  // useEffect(() => {
  //   localStorage.setItem("toDo", JSON.stringify(toDo));
  // }, []);

  return (
    <>
      {toDo?.text}
      created at : {toDo?.id}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    toDos: state,
  };
};

export default connect(mapStateToProps)(Detail);
