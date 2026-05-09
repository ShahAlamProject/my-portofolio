import { Link } from "react-scroll";
import React from "react";
import { useLang } from "../../LangContext";

function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();
  const copyrightText = t.footer.copyright.replace(/\b20\d{2}\b/, String(currentYear));
  const whatsappLink = "https://wa.me/";
  const emailLink = "mailto:";
  return (
    <footer id="Footer" className="footer--container">
      <div className="footer--link--container">
        <div>
          <img src="./img/logo.svg" alt="Logoipsum" />
        </div>
        <div className="footer--items">
          <ul>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="heroSection"
                className="text-md"
              >
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="mySkills"
                className="text-md"
              >
                {t.skills.label}
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="AboutMe"
                className="text-md"
              >
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Experience"
                className="text-md"
              >
                {t.experience.label}
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="MyPortfolio"
                className="text-md"
              >
                {t.nav.portfolio}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer--social--icon">
          <p className="footer--social-title">My Contact</p>
          <ul>
            <li>
              <a
                href={whatsappLink}
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.56 2 2.11 6.45 2.11 11.92c0 1.75.46 3.47 1.32 4.98L2 22l5.25-1.38a9.9 9.9 0 0 0 4.77 1.22h.01c5.47 0 9.92-4.45 9.92-9.92a9.86 9.86 0 0 0-2.9-7.01ZM12.03 20.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.84-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.51 3.67-8.19 8.2-8.19 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.79c0 4.52-3.68 8.2-8.18 8.2Zm4.49-6.11c-.25-.12-1.47-.73-1.7-.81-.23-.09-.39-.12-.56.12-.16.24-.64.81-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.24-.02-.37.1-.49.11-.11.25-.29.37-.43.12-.14.16-.24.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.24-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.55.12.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href={emailLink}
                className="navbar--content"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.24-7.06 4.42a1.8 1.8 0 0 1-1.88 0L4 7.24V6l7.06 4.41a1.8 1.8 0 0 0 1.88 0L20 6v1.24Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 33" fill="currentColor">
                  <path d="M22.6667 8.65479H18.6667C17.9303 8.65479 17.3333 9.25175 17.3333 9.98812V13.9881H22.6667C22.8183 13.9848 22.9621 14.0553 23.0523 14.1773C23.1424 14.2993 23.1677 14.4575 23.12 14.6015L22.1333 17.5348C22.0424 17.804 21.7908 17.986 21.5067 17.9881H17.3333V27.9881C17.3333 28.3563 17.0348 28.6548 16.6667 28.6548H13.3333C12.9651 28.6548 12.6667 28.3563 12.6667 27.9881V17.9881H10.6667C10.2985 17.9881 10 17.6896 10 17.3215V14.6548C10 14.2867 10.2985 13.9881 10.6667 13.9881H12.6667V9.98812C12.6667 7.0426 15.0545 4.65479 18 4.65479H22.6667C23.0348 4.65479 23.3333 4.95327 23.3333 5.32145V7.98812C23.3333 8.35631 23.0348 8.65479 22.6667 8.65479Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 33" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.0001 4.65479H11.3334C7.65152 4.65479 4.66675 7.63956 4.66675 11.3215V21.9881C4.66675 25.67 7.65152 28.6548 11.3334 28.6548H22.0001C25.6819 28.6548 28.6667 25.67 28.6667 21.9881V11.3215C28.6667 7.63956 25.6819 4.65479 22.0001 4.65479ZM26.3334 21.9881C26.3261 24.3783 24.3902 26.3141 22.0001 26.3215H11.3334C8.94321 26.3141 7.0074 24.3783 7.00008 21.9881V11.3215C7.0074 8.93125 8.94321 6.99544 11.3334 6.98812H22.0001C24.3902 6.99544 26.3261 8.93125 26.3334 11.3215V21.9881ZM23.0001 11.6548C23.7365 11.6548 24.3334 11.0578 24.3334 10.3215C24.3334 9.58508 23.7365 8.98812 23.0001 8.98812C22.2637 8.98812 21.6667 9.58508 21.6667 10.3215C21.6667 11.0578 22.2637 11.6548 23.0001 11.6548ZM16.6667 10.6548C13.353 10.6548 10.6667 13.3411 10.6667 16.6548C10.6667 19.9685 13.353 22.6548 16.6667 22.6548C19.9805 22.6548 22.6667 19.9685 22.6667 16.6548C22.6703 15.0624 22.0393 13.5342 20.9133 12.4082C19.7873 11.2822 18.2591 10.6512 16.6667 10.6548ZM13.0001 16.6548C13.0001 18.6799 14.6417 20.3215 16.6667 20.3215C18.6918 20.3215 20.3334 18.6799 20.3334 16.6548C20.3334 14.6297 18.6918 12.9881 16.6667 12.9881C14.6417 12.9881 13.0001 14.6297 13.0001 16.6548Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/"
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 33" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M28.3929 9.22544C27.7865 8.05176 27.1165 7.84582 25.7212 7.76891C24.3272 7.67461 20.7481 7.6548 16.6673 7.6548C12.5784 7.6548 8.99793 7.67461 7.60527 7.76759C6.21261 7.84582 5.54126 8.05044 4.92826 9.22544C4.30199 10.3978 3.99992 12.4334 3.99992 15.9974C3.99992 15.9987 3.99992 16 3.99992 16C3.99992 16.0013 3.99992 16.0027 3.99992 16.0027V16.004C3.99992 19.5534 4.30199 21.6036 4.92826 22.762C5.54126 23.937 6.21129 24.1403 7.60527 24.2332C8.99793 24.3128 12.5784 24.3326 16.6673 24.3326C20.7481 24.3326 24.3272 24.3128 25.7225 24.2345C27.1178 24.1416 27.7878 23.9383 28.3942 22.7633C29.0258 21.6049 29.3333 19.5547 29.3333 16.0053C29.3333 16.0053 29.3333 16.0027 29.3333 16.0013C29.3333 16.0013 29.3333 15.9987 29.3333 15.9974C29.3333 12.4334 29.0258 10.3978 28.3929 9.22544ZM13.9999 20.3215V11.6548L21.3333 15.9895L13.9999 20.3215Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                className="navbar--content"
                target="_blank"
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 33" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.33341 4.65479H26.0001C27.4729 4.65479 28.6667 5.84869 28.6667 7.32145V25.9881C28.6667 27.4609 27.4729 28.6548 26.0001 28.6548H7.33341C5.86065 28.6548 4.66675 27.4609 4.66675 25.9881V7.32145C4.66675 5.84869 5.86065 4.65479 7.33341 4.65479ZM11.3334 24.6548C11.7016 24.6548 12.0001 24.3563 12.0001 23.9881V14.6548C12.0001 14.2867 11.7016 13.9881 11.3334 13.9881H9.33342C8.96523 13.9881 8.66675 14.2867 8.66675 14.6548V23.9881C8.66675 24.3563 8.96523 24.6548 9.33342 24.6548H11.3334ZM10.3334 12.6548C9.22884 12.6548 8.33341 11.7594 8.33341 10.6548C8.33341 9.55021 9.22884 8.65479 10.3334 8.65479C11.438 8.65479 12.3334 9.55021 12.3334 10.6548C12.3334 11.7594 11.438 12.6548 10.3334 12.6548ZM24.0001 24.6548C24.3682 24.6548 24.6667 24.3563 24.6667 23.9881V17.8548C24.7101 15.7359 23.1435 13.9275 21.0401 13.6681C19.5694 13.5338 18.1445 14.2207 17.3334 15.4548V14.6548C17.3334 14.2867 17.0349 13.9881 16.6667 13.9881H14.6667C14.2986 13.9881 14.0001 14.2867 14.0001 14.6548V23.9881C14.0001 24.3563 14.2986 24.6548 14.6667 24.6548H16.6667C17.0349 24.6548 17.3334 24.3563 17.3334 23.9881V18.9881C17.3334 17.8836 18.2289 16.9881 19.3334 16.9881C20.4379 16.9881 21.3334 17.8836 21.3334 18.9881V23.9881C21.3334 24.3563 21.6319 24.6548 22.0001 24.6548H24.0001Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="divider" />
      <div className="footer--content--container">
        <p className="text-sm">{copyrightText}</p>
        <div className="footer--social--icon">
          <ul>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Privacy_Policy"
                className="text-sm"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Terms_of_Service"
                className="text-sm"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                activeClass="footer--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Cookies_Settings"
                className="text-sm"
              >
                Cookies Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
