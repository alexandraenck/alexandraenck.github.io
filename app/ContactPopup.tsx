"use client";

import { useRef } from "react";

export function ContactPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button className="contact-link" type="button" onClick={openDialog}>
        Drop a note <span aria-hidden="true">↗</span>
      </button>

      <dialog
        className="contact-dialog"
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeDialog();
          }
        }}
      >
        <div className="contact-dialog__content">
          <div className="contact-dialog__header">
            <div>
              <p className="eyebrow">Drop a note</p>
              <h2 id="contact-dialog-title">Say hello.</h2>
            </div>
            <button
              className="contact-dialog__close"
              type="button"
              onClick={closeDialog}
              aria-label="Close contact form"
            >
              ×
            </button>
          </div>

          <p id="contact-dialog-description" className="contact-dialog__intro">
            Tell me what you&apos;re working on, dreaming up, or hoping to make.
          </p>

          <form className="contact-form">
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} required />
            </label>
            <button className="contact-form__submit" type="submit" disabled>
              Send message
            </button>
            <p className="contact-form__note">
              Email delivery will be connected soon.
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
