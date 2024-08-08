import Image from 'next/image'

type CardProps = {
    ImageSrc: string;
    altText: string;
}

const Card = ({ ImageSrc, altText }: CardProps) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-5 m-6 md:w-72 lg:w">
        <Image
            src={ImageSrc}
            alt={altText}
            width={400}
            height={200}
            className="w-full h-full object-cover"
        />
      </div>
    );
  };
  
  export default Card;