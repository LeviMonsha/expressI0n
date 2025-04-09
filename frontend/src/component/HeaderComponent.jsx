import React from "react";

function HeaderComponent({ user, logoutUrl }) {
  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <nav className="container mx-auto flex justify-end">
        <ul className="flex items-center gap-4">
          <li>
            <a href={logoutUrl} className="text-blue-600 hover:text-blue-800">
              Выйти
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;
