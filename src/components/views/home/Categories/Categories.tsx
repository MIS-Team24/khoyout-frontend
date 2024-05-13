import { categories } from "@/assets";

function Categories() {
  return (
    <section className="mt-16">
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center lg:w-[72rem]">
          <h2 className="w-full pb-8 text-[2rem] font-normal">
            Browse Designers By Categories
          </h2>
          <div className="flex w-full flex-wrap justify-center gap-6 px-4 sm:px-0">
            {categories.map(({ src, alt }, i) => (
              <div
                className="h-[19.9rem] w-full max-w-[35.25rem] rounded-[0.5rem]"
                key={i}
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full rounded-[0.5rem] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
