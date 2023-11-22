import { dictionary } from '@/utils/constants/dictionary';

function Footer() {
  return (
    <footer className="bg-black shadow  w-full dark:bg-black">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-white">
          © 2023{' '}
          <a href="/#" className="hover:underline">
            AIBOT™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
          <li>
            <a href="/#" className="hover:underline me-4 md:me-6">
              {dictionary.az.about}
            </a>
          </li>
          <li>
            <a href="/#" className="hover:underline me-4 md:me-6">
              {dictionary.az.privacyPolicy}
            </a>
          </li>
          <li>
            <a href="/#" className="hover:underline me-4 md:me-6">
              {dictionary.az.licensing}
            </a>
          </li>
          <li>
            <a href="/#" className="hover:underline">
              {dictionary.az.contact}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
