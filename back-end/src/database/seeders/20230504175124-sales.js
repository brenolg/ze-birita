module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales', [{
        id: 1,
        user_id: 4,
        seller_id: 2,
        total_price: 10.20,
        delivery_address: 'Rua dos Devs',
        delivery_number: 'Apto. 13637',
        status: 'Pendente',
        sale_date: '2021-09-30 00:00:00',
      },
      {
        id: 2,
        user_id: 5,
        seller_id: 2,
        total_price: 30.50,
        delivery_address: 'Rua Back End',
        delivery_number: 'Apto. 16',
        status: 'Pendente',
        sale_date: '2023-09-30 00:00:00',
      },
      {
        id: 3,
        user_id: 6,
        seller_id: 2,
        total_price: 15.20,
        delivery_address: 'Rua dos Fronts',
        delivery_number: 'Apto. 13637',
        status: 'Pendente',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 4,
        user_id: 4,
        seller_id: 3,
        total_price: 18.30,
        delivery_address: 'Rua dos JWTs',
        delivery_number: 'Apto. 18337',
        status: 'Preparando',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 5,
        user_id: 5,
        seller_id: 3,
        total_price: 10.33,
        delivery_address: 'Rua dos Nodemon',
        delivery_number: 'Apto. 13737',
        status: 'Preparando',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 6,
        user_id: 6,
        seller_id: 3,
        total_price: 100.39,
        delivery_address: 'Rua dos Node.js',
        delivery_number: 'Apto. 13237',
        status: 'Preparando',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 7,
        user_id: 7,
        seller_id: 3,
        total_price: 125.35,
        delivery_address: 'Rua dos CSS',
        delivery_number: 'Apto. 1927',
        status: 'Em Trânsito',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 8,
        user_id: 8,
        seller_id: 3,
        total_price: 105.30,
        delivery_address: 'Rua dos Express.js',
        delivery_number: 'Apto. 17',
        status: 'Em Trânsito',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 9,
        user_id: 9,
        seller_id: 3,
        total_price: 55.90,
        delivery_address: 'Rua dos React.js',
        delivery_number: 'Apto. 24',
        status: 'Em Trânsito',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 10,
        user_id: 10,
        seller_id: 3,
        total_price: 75.70,
        delivery_address: 'Rua dos Angular.js',
        delivery_number: 'Apto. 1554',
        status: 'Entregue',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 11,
        user_id: 11,
        seller_id: 3,
        total_price: 112.30,
        delivery_address: 'Rua dos Middlewares',
        delivery_number: 'Apto. 17',
        status: 'Entregue',
        sale_date: '2013-09-30 20:00:00',
      },
      {
        id: 12,
        user_id: 12,
        seller_id: 3,
        total_price: 105.20,
        delivery_address: 'Rua dos Context API',
        delivery_number: 'Apto. 43',
        status: 'Entregue',
        sale_date: '2013-09-30 20:00:00',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
