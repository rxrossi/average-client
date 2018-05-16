import React from "react";
import { Link } from "react-router-dom";

export default ({ article, small, handleDelete }) => {
  const { title, author, mainImg, description, link } = article;

  const styles = getStyles(small);
  return (
    <Link
      to={{
        pathname: `article/${link}`,
        state: { article }
      }}
    >
      <div style={styles.wrapper}>
        <Image small={small} src={mainImg} />
        <div style={styles.textWrapper}>
          <h1 style={styles.title}>{title}</h1>
          {!small && <p>{description}</p>}
          <p style={styles.p}> By: {author.name} </p>
          {handleDelete && (
            <DeleteBtn handleDelete={handleDelete} link={article.link} />
          )}
        </div>
      </div>
    </Link>
  );
};

const DeleteBtn = ({ handleDelete, link }) => (
  <button
    onClick={e => {
      e.preventDefault();
      handleDelete(link);
    }}
  >
    Remove
  </button>
);

const Image = ({ src, small }) => {
  const style = url => ({
    height: small ? "100px" : "100%",
    display: "inline-block",
    width: small ? "100%" : "40%",
    backgroundImage: `url("${url}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    float: "left"
  });

  return <div style={style(src)}> </div>;
};

const getStyles = small => ({
  wrapper: {
    cursor: "pointer",
    position: "relative",
    height: small ? "170px" : "130px",
    width: small ? "222px" : "460px",
    textAlign: !small && "left",
    float: "left",
    marginLeft: "15px",
    marginTop: "15px",
    backgroundColor: "#fdfdfd",
    border: "1px solid #f7f7f7"
  },
  title: {
    fontSize: small ? "1.35rem" : "1.6rem",
    weight: "bold",
    margin: "0.2rem",
    marginTop: small ? "0.2rem" : "0",
    color: "#333"
  },
  p: {
    fontSize: "0.9rem",
    color: "#666",
    position: "absolute",
    bottom: "0",
    right: "0.2rem",
    margin: "0.2rem"
  },
  textWrapper: {
    padding: "2%",
    width: small ? "100%" : "60%",
    height: small ? "auto" : "100%",
    display: "inline-block"
  }
});
