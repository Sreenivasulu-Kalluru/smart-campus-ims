export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 text-center border-t border-gray-200">
      <p>
        &copy; {new Date().getFullYear()} Smart Campus Item Management System.
        All rights reserved.
      </p>
    </footer>
  );
}
