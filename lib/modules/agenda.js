define(['underscore', 'jquery', 'backbone'], function() {

	(function($) {
		var Persona = Backbone.Model.extend({
			defaults: function() {
				return {
					nombre: '',
					direccion: '',
					edad: ''
				}
			},

			// validate: function(attr) {
			// 	if (!attr.nombre) {
			// 		return 'Debes escribir un nombre';
			// 	}
			// 	if (!attr.direccion) {
			// 		return 'La dirección no debe estar vacía';
			// 	}
			// 	if (!attr.edad) {
			// 		return 'Debes escribir tu edad';
			// 	}
			// },

			validate: function(attrs) {
				var errors = this.errors = {};

				if (!attrs.nombre) errors.nombre = 'El nombre es obligatorio';
				if (!attrs.direccion) errors.direccion = 'La dirección es obligatoria';
				if (!attrs.edad) errors.edad = 'Debes especificar tu edad';

				if (!_.isEmpty(errors)) return errors;
			}
		});

		var ListaPersonas = Backbone.Collection.extend({
			model: Persona
		});

		var personas = new ListaPersonas();

		var PersonaView = Backbone.View.extend({
			model: new Persona(),
			tagName: 'div',
			initialize: function() {
				this.template = _.template($('#persona-template').html());
			},
			render: function() {
				this.$el.html(this.template(this.model.toJSON()))
				return this;
			}
		});

		var PersonasView = Backbone.View.extend({
			model: personas,
			el: $('#persona-container'),
			initialize: function() {
				this.model.on('add', this.render, this);
			},
			render: function() {
				var self = this;
				self.$el.html('');
				_.each(this.model.toArray(), function(persona, i) {
					self.$el.append((new PersonaView({model: persona})).render().$el);
				});
				return this;
			}
		});

		$(function() {
			$('#nueva-persona').submit(function(ev) {
				var persona = new Persona({ nombre: $('#nombre-contacto').val(), direccion: $('#dire-contacto').val(), edad: $('#edad-contacto').val()}, { validate: true, validateAll: false });

				// validation test code

				// var persona = new Persona();
				// persona.set({ nombre: $('#nombre-contacto').val(), direccion: $('#dire-contacto').val(), edad: $('#edad-contacto').val()}, { validate: true });

				persona.on('invalid', function(model, errors) {
					console.log(errors);
					return false;
				});

				if (!persona.isValid()) {
					alert(errors);
					return false;
				}

				// end of validation test code

				personas.add(persona);
				
				console.log(personas.toJSON());

				return false;
			});

			var appView = new PersonasView();
		});
	})(jQuery);

});