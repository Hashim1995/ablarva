function Footer() {
  return (
    <footer className="bg-black shadow z-10  w-full dark:bg-black">
      <div className="w-full mx-auto  p-4 flex items-center justify-between">
        <div />
        <div className="text-sm text-gray-500 text-center dark:text-white">
          <a href="/#" className="hover:underline">
            AI-ZADE™
          </a>
          . All Rights Reserved. © 2023{' '}
        </div>
        <div className="text-sm text-gray-500 text-center dark:text-white">
          Version: 0.2.1
        </div>
      </div>
    </footer>
  );
}

export default Footer;
