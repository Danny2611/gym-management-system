export default function GridShape() {
  return (
    <>
      <div className="-z-1 absolute right-0 top-0 w-full max-w-[250px] xl:max-w-[450px]">
        <img src="/images/shape/grid-01.svg" alt="grid" />
      </div>
      <div className="-z-1 absolute bottom-0 left-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <img src="/images/shape/grid-01.svg" alt="grid" />
      </div>
    </>
  );
}
