import Image from "next/image";
import Link from "next/link";

const Activity7 = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-4">
      <Image
        className="select-none mb-4"
        src="/images/a1-test.png"
        width={500}
        height={500}
        alt="Test case example"
      />
      <h2 className="text-2xl font-bold mb-2">Test Case Explanation</h2>
      <ul className="flex flex-col gap-2 text-lg max-w-md list-disc list-inside">
        <li>
          Test for Presence: The first test ensures the heading element is
          rendered on the page.
        </li>
        <li>
          Test for Correct Content: The second test ensures that the{" "}
          <code>&lt;h1&gt;</code> tag contains the correct text, "Hello World."
        </li>
      </ul>
      <Link
        className="text-blue-500 mt-4"
        target="_blank"
        href="https://github.com/prxncxss03/nextjs-activity/blob/development/src/app/activity/1/__tests__/page.test.jsx"
      >
        View the source code on GitHub
      </Link>
    </div>
  );
};

export default Activity7;
