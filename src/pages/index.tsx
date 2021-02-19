import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Container } from '../styles/pages/Home';

interface IProducts {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProducts[];
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  /*** Client side fetching - qunado não precisa que os motores de busca tenham
   * esses dados.
   * Quando não precisa ter esses dados no carregamento da página
   */
  useEffect(() => {
    fetch('http://localhost:3333/recommended').then((response) => {
      response.json().then((data) => setRecommendedProducts(data));
    });
  }, []);

  return (
    <Container>
      <h1>Recommended Products</h1>
      {recommendedProducts.map((rp) => (
        <h3 key={rp.id}>{rp.title}</h3>
      ))}
    </Container>
  );
}

/** Server side rendering - Lado do servidor (node -> backend)
 * Precisa ter os dados no carregamento da pagina
 * */
// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   const response = await fetch('http://localhost:3333/recommended');
//   const recommendedProducts = await response.json();

//   return {
//     props: {
//       recommendedProducts,
//     },
//   };
// };

/** Static side generation
 *
 * Não são dinamicas, não vão ficar tendo atualizações constantes
 */
