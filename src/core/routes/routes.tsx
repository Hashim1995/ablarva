import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// const LoginPage = React.lazy(() => import('@core/static-pages/login-page'));
import LoginPage from '@core/static-pages/login-page';

const LayoutPage = React.lazy(() => import('@core/layout/layout'));

const routes = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { path: '/', element: <Navigate to="chat" /> },

      {
        index: true,
        path: 'chat',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <p className="text-xs">Lorem Ipsum xs</p>
            <p className="text-sm">Lorem Ipsum sm</p>
            <p className="text-md">Lorem Ipsum md</p>
            <p className="text-xl">Lorem Ipsum xl</p>
            <p className="text-2xl">Lorem Ipsum 2xl</p>
            <p className="text-3xl">Lorem Ipsum 3xl</p>
            <p className="text-4xl">Lorem Ipsum 4xl</p>
            <p className="text-5xl">Lorem Ipsum 5xl</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            corrupti beatae nulla architecto accusantium sequi labore aspernatur
            et, veniam aliquam enim? Sequi atque qui vel dolorem autem ducimus,
            velit harum! Alias sed optio tempora magnam sapiente quisquam, nam,
            quas nihil animi ullam doloremque quae laudantium ab hic eveniet
            dicta, eius temporibus modi quam explicabo omnis odio magni dolores.
            Incidunt, deserunt. Molestias commodi et repellat, quibusdam aut
            minus accusamus facere earum sunt? Quos quae quod voluptatem
            possimus beatae neque, tenetur laborum repellendus alias accusamus
            placeat nam ducimus aliquam! Quisquam, obcaecati iusto. Repudiandae
            explicabo inventore, tenetur velit pariatur qui temporibus ex
            commodi quasi ea, debitis nisi, fugit culpa voluptas doloribus
            soluta quod! Adipisci sunt, tempora omnis deserunt nemo repudiandae
            quam repellendus eum! Ea exercitationem asperiores laudantium nisi
            voluptate ab? Nam error ratione illo repudiandae blanditiis,
            reiciendis magni pariatur quam animi deserunt modi, consequatur
            fugiat voluptatibus dolores quae. Molestiae sed excepturi a officia!
            Pariatur voluptate delectus saepe unde eaque quae rem nemo
            praesentium, exercitationem, animi maxime dolor voluptas at totam,
            deleniti eius ab fugiat commodi earum assumenda temporibus
            dignissimos similique. Sed, enim optio? Adipisci repellendus laborum
            quo a ipsa autem, quia quasi accusantium recusandae culpa facilis
            quod possimus ullam nobis iste sit nemo quis at. Aliquid, molestiae
            architecto harum blanditiis necessitatibus unde doloribus. Tempora
            cupiditate asperiores consequatur ratione temporibus reiciendis,
            voluptatem ex error, repudiandae blanditiis exercitationem ab harum
            tenetur? Error dicta, unde enim rem rerum possimus earum omnis
            eligendi quae dolores consequuntur non? Quidem, aspernatur quam iste
            iure ut incidunt excepturi at atque quo animi enim ea ipsum
            expedita? Cumque eveniet tenetur cum reprehenderit doloremque?
            Dolor, delectus! Praesentium eaque ducimus nulla sed cupiditate?
            Omnis architecto enim, doloribus repellendus earum nihil nobis
            voluptatum ipsa rem eaque voluptatibus, vel unde fugiat eveniet est
            ea sapiente. Nostrum, non enim iusto eum placeat earum! Molestias,
            accusantium sed! Eum saepe esse odio unde numquam labore provident
            ab nulla ex sed maxime expedita itaque quibusdam, aut quos inventore
            fuga facilis aliquam suscipit iure dolorem? Blanditiis porro rerum
            distinctio ipsum! Dignissimos dolorum voluptas, laboriosam vero
            quasi itaque necessitatibus non ullam officia, deleniti blanditiis
            ab magni! Corrupti nostrum magnam velit iusto, vero enim labore ea
            similique id aut nobis fugiat eaque! Suscipit odio officia explicabo
            pariatur veniam facilis, eius dolorum magnam dolore impedit non
            enim, blanditiis quaerat animi, rerum nostrum cumque! Voluptate,
            odio quidem placeat incidunt non expedita voluptatibus a dolores.
            Molestias quisquam assumenda dicta, voluptate vitae minus! Veniam
            eveniet, numquam aut, magnam ipsa modi omnis eaque ab veritatis
            illum quaerat. Non dignissimos, repellat voluptatibus libero
            provident fuga vel laboriosam laudantium? Animi delectus rerum ipsam
            debitis dolorem dolor officia et voluptates provident non! Quidem
            cumque animi accusamus quam esse aliquam unde suscipit molestias
            recusandae tenetur corporis enim quas maiores, eligendi iste.
            Cupiditate saepe natus neque reiciendis eligendi libero in culpa?
            Fuga accusantium maxime consequatur architecto obcaecati
            reprehenderit, minima, natus aliquam, facilis voluptates unde
            explicabo. Omnis soluta provident explicabo officia debitis
            voluptatibus. Nostrum, officia vel expedita tempora nesciunt quas ex
            harum perspiciatis laborum sapiente sunt natus eveniet accusantium
            amet unde ullam reiciendis? Quia aliquam iusto voluptatibus quo
            perspiciatis repellendus culpa id magni! Nihil reiciendis similique
            animi quaerat voluptas tempore inventore sapiente consequuntur
            cupiditate quis voluptatem maxime saepe illo sunt ducimus delectus
            quibusdam deleniti laboriosam ad blanditiis ab, beatae omnis sed?
            Nisi, similique? Eveniet cumque blanditiis molestiae? Eaque impedit
            fuga, molestias officia, dolorem assumenda libero itaque molestiae
            dolor quidem mollitia, unde debitis! Iste eum ab dolore incidunt
            dolorem recusandae repellat laborum possimus rerum? Corporis
            mollitia voluptatibus nemo iste molestias dignissimos recusandae
            quia saepe quaerat illo, doloribus odio veritatis enim unde
            assumenda similique optio corrupti. Quisquam iusto architecto
            perferendis voluptatibus deserunt soluta veniam aliquid. Dolores
            laborum quod similique labore! Perspiciatis nemo non voluptatum, at
            sapiente cum officia modi corrupti repellendus aperiam rem adipisci
            quasi necessitatibus odio maxime, eligendi voluptatem perferendis
            voluptates ab autem doloribus? Optio numquam, soluta assumenda porro
            odit, iste voluptas cum debitis id blanditiis sequi dolor totam
            facere veritatis reprehenderit architecto quisquam consequuntur non
            laboriosam. Ut, veniam ex unde voluptatibus recusandae officia?
            Nostrum, fugit eveniet? Recusandae, dolores dolor placeat ad enim
            velit non assumenda atque consectetur repellat corrupti vel
            quibusdam, numquam rem nobis suscipit quod optio provident quisquam.
            Soluta ut porro rerum. Ipsa reprehenderit ab adipisci! Blanditiis
            minima velit ut adipisci, odio repudiandae tempore corrupti rem
            temporibus laboriosam facere quod sint quidem consequuntur molestiae
            non molestias quam obcaecati porro amet cum! Itaque? Sequi ut
            excepturi exercitationem reiciendis dolor dolorem itaque nisi culpa
            ab illo, amet est quisquam voluptatem esse iure impedit eos minus
            voluptas consequatur quae assumenda iste repellendus magnam odio.
            Praesentium! Laudantium magnam quos eum sequi, consectetur
            aspernatur consequuntur repudiandae vero repellat nisi possimus
            voluptates odit perspiciatis error fuga laboriosam voluptatem hic
            vel molestiae autem maiores provident delectus voluptas. Ipsa,
            asperiores. Vel alias magni, et aut velit eos expedita voluptatem
            laudantium harum blanditiis suscipit explicabo provident odit
            maiores modi pariatur doloribus. Dicta magni tempora velit. Ad
            consectetur impedit hic corrupti itaque. Neque ea qui minus alias
            debitis, numquam sapiente exercitationem architecto animi expedita
            placeat temporibus consequatur fugiat molestias itaque soluta
            maiores. Minima sed molestiae aliquam unde dolorem distinctio
            tempora exercitationem culpa! Hic modi optio iusto cum dolores
            corporis vel voluptatem repudiandae quidem blanditiis voluptatibus
            ipsa fugiat ducimus nesciunt odit, earum sequi in expedita quam!
            Veniam nesciunt unde repudiandae, tempora fugit vero. Amet, aliquam
            quos! Accusamus minus, quidem placeat ducimus eveniet excepturi amet
            porro explicabo modi asperiores dolorum sit soluta ex non et neque
            quos deleniti eos ipsam, deserunt tempora. Atque, dolorem.
          </Suspense>
        )
      },
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tarifler</h1>
          </Suspense>
        )
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tenzimleme</h1>
          </Suspense>
        )
      },
      {
        path: 'history',
        element: (
          <Suspense fallback={<div>fallback</div>}>
            {' '}
            <h1>tarixce</h1>
          </Suspense>
        )
      },

      {
        path: 'no-permission',
        element: <h1>no permission</h1>
      },
      {
        path: '404',
        element: <h1>404</h1>
      }
    ]
  },

  {
    path: 'login',
    element: <LoginPage />
  },

  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

export default routes;
