import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";

/**
 * @author Rizwan Khan
 * @function
 **/

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className={styles.modalFixedBg}>
        <div style={{ position: "relative" }}>
          <div className={styles.modalClose} onClick={props.onClose}>
            ✕
          </div>
          <div className={styles.modalContainer}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(false);
  const [touch, setTouch] = useState(false);

  return (
    <div className={styles.materialInput}>
      <label
        className={`${styles.label} ${focus ? `${styles.focus}` : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          required
          className={styles.input}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
            setTouch(true)
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            } else {
              setTouch(false)
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
      {
        touch && (
          <div style={{
            fontSize: '10px',
            color: 'red',
            fontWeight: 500
          }}>
            {props.label} is required
          </div>
        )
      }
    </div>
  );
};

const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div style={{ width: "90%", ...props.style }}>
      <button
        style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
        }}
        className={styles.materialButton}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className={styles.headerDropdownContainer}>
      {props.menu}
      <div className={styles.dropdown}>
        <div className={styles.upArrow}></div>
        {props.firstMenu}
        <ul className={styles.headerDropdownMenu}>
          {props.menus &&
            props.menus.map((item, index) => (
              <li key={index}>
               {item.href ? <Link href={item.href}>
                  <a>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                </Link> : <a><span
                      onClick={(e) => {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }}
                    >
                      {item.label}
                    </span></a> }
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Anchor = (props) => {
  return (
    <button {...props} className={`${styles.anchorButton}`}>
      {props.name}
    </button>
  );
};

const Breed = (props) => {
  return (
    <div className={styles.breed}>
      <ul>
        {props.breed &&
          props.breed.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              <span>{props.breedIcon && props.breedIcon}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, Anchor, Breed };
