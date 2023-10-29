interface Props {
  params: { id: string }
}

const SupplyByIdUpdatePage: React.FC<Props> = ({ params }) =>  {
  return (
    <div>
      <h1>Hello SupplyByIdUpdate Page - Params : {params.id}</h1>
    </div>
  );
}

export default SupplyByIdUpdatePage