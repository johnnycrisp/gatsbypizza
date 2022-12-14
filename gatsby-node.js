import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // The url for the new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // The url for the new page
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        // add todoRegex for topping if wanted
      },
    });
  });
}

async function turnIndividualSlicemastersIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza

  data.slicemasters.nodes.forEach((person) => {
    actions.createPage({
      // The url for the new page
      path: `slicemaster/${person.slug.current}`,
      component: slicemasterTemplate,
      context: {
        slug: person.slug.current,
      },
    });
  });
}

// Sourcing Nodes into Graphql

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log('TurnBeers into NOdes');

  // 1. Fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();

  // 2. Loop over each one

  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // 3. Create a node for that beer
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Turn each slm into own page

  // 3. Figure out how many pages there are based on how many slm there are and how many per page.

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  // 4. Loop from 1 to n and create pages for them

  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(i);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  //   Wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
    turnIndividualSlicemastersIntoPages(params),
  ]);
  //   1. Pizzas
  //   2. Toppings
  //   3. Slicemasters
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into gatsby

  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}
