'use strict';

// Exercise 1 :
function rental_price() {

	for (var i = 0; i < rentals.length; i++) {

		for (var j = 0; j < cars.length; j++) {

			if (cars[j].id == rentals[i].carId ) {
				
				// Get the number of days for the location
				var nb_days =  new Date(rentals[i].returnDate).getTime() - new Date(rentals[i].pickupDate).getTime();
				nb_days = nb_days/(1000*60*60*24);
				
				// Calcul of the rental price
				var time_component = nb_days * cars[j].pricePerDay;
				var distance_component = rentals[i].distance * cars[j].pricePerKm;		
				rentals[i].price = time_component + distance_component;
			}
		}
	}
}
/* Updates :
   id : 1-pb-92 | price : 10 
   id : 2-rs-92 | price : 330
   id : 3-sa-92 | price : 1850
*/



// Exercise 2 :
function new_prices() {
	
	for (var i = 0; i < rentals.length; i++) {

		for (var j = 0; j < cars.length; j++) {

			if (cars[j].id == rentals[i].carId ) {
							
				// Get the number of days for the location
				var nb_days =  new Date(rentals[i].returnDate).getTime() - new Date(rentals[i].pickupDate).getTime();
				nb_days = nb_days/(1000*60*60*24);
						
				// Conditions for the reduction
				if (1 <= nb_days <= 4) {
					cars[j].pricePerDay = cars[j].pricePerDay * 0.9; // 10%
				}
				else if (5 <= nb_days <= 10) {
					cars[j].pricePerDay = cars[j].pricePerDay * 0.7; // 30%
				}
				else if (nb_days > 10) {
					cars[j].pricePerDay = cars[j].pricePerDay * 0.5; // 50%
				} 
				
				// Calcul of the rental price
				var time_component = nb_days * cars[j].pricePerDay;
				var distance_component = rentals[i].distance * cars[j].pricePerKm;
				rentals[i].price = time_component + distance_component;
			}
		}
	}
}
/* Updates :
   id : 1-pb-92 | price : 10 
   id : 2-rs-92 | price : 306 
   id : 3-sa-92 | price : 1710
*/


// Exercise 3 :
function commission() {
	
	for (var i = 0; i < rentals.length; i++) {

		// Get the number of days for the location
		var nb_days =  new Date(rentals[i].returnDate).getTime() - new Date(rentals[i].pickupDate).getTime();
		nb_days = nb_days/(1000*60*60*24);
		
		var comm = rentals[i].price * 0.3; // 30% of the rental price
		rentals[i].commission.insurance = comm/2;     
		rentals[i].commission.assistance = nb_days;
		rentals[i].commission.drivy = comm/2-nb_days;
	}
}
/* Updates :
   id : 1-pb-92 | assistance : 0  | drivy : 1.5   | insurance : 1.5
   id : 2-rs-92 | assistance : 4  | drivy : 41.9  | insurance : 45.9
   id : 3-sa-92 | assistance : 14 | drivy : 242.5 | insurance : 256.5
*/



// Exercise 4 :
function deductible_option() {
	
	for (var i = 0; i < rentals.length; i++) {

		// Get the number of days for the location
		var nb_days =  new Date(rentals[i].returnDate).getTime() - new Date(rentals[i].pickupDate).getTime();
		nb_days = nb_days/(1000*60*60*24);

		if (rentals[i].options.deductibleReduction === true) {
			rentals[i].commission.drivy += 4*nb_days;
			rentals[i].price += 4*nb_days;
		}
	}
}
/* Updates :
   id : 1-pb-92 | drivy : 1.5   | price : 10
   id : 2-rs-92 | drivy : 57.9  | price : 322
   id : 3-sa-92 | drivy : 298.5 | price : 1766
*/



// Exercise 4 :
function actors_payment() {

	for (var i = 0; i < rentals.length; i++) {
		
		for (var j = 0; j < actors.length; j++) {
		
			for (var k = 0; k < actors[j].payment.length; k++) {
				
				if (rentals[i].id == actors[j].rentalId ) {
				
					switch(actors[j].payment[k].who) {

						case "driver" :
							actors[j].payment[k].amount = rentals[i].price;
						break;
						
						case "owner" :
							actors[j].payment[k].amount = rentals[i].price - rentals[i].commission.insurance - rentals[j].commission.assistance - rentals[i].commission.drivy;// - comm;
						break;
						
						case "insurance" :
							actors[j].payment[k].amount = rentals[i].commission.insurance;
						break;
						
						case "assistance" :
							actors[j].payment[k].amount = rentals[j].commission.assistance;
						break;
						
						case "drivy" :
							actors[j].payment[k].amount = rentals[i].commission.drivy;
						break;		
					
					}
				}	
			}
		}
	}
}



//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);

rental_price();
new_prices();
commission();
deductible_option();
actors_payment();