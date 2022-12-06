import React from "react";
import * as ReactRedux from "react-redux";
import Link from 'next/link'
import { getCategories } from "../../actions/categoryActions";
import style from "./index.module.css";

const MenuHeder = (props) => {
  const category = ReactRedux.useSelector((state) => state.category);
  const dispatch = ReactRedux.useDispatch();

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <Link href={{pathname:`/[slug]`, query: {
              cid: category._id, type: category.type
            }}}
             as={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            
            >
            <a>
              {category.name}
            </a>
            </Link>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children && category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className={style.menuHeader}>
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeder;
