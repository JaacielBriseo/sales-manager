interface Props {
  params: { id: string }
}

const SupplyByIdPage: React.FC<Props> = ({ params }) =>  {
  return (
    <div>
      <h1>Hello SupplyById Page - Params : {params.id}</h1>
    </div>
  );
}

export default SupplyByIdPage