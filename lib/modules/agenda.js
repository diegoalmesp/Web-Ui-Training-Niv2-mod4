define(['underscore', 'jquery', 'backbone'], function() {

	(function($) {
		var Persona = Backbone.Model.extend({
			defaults: function() {
				return {
					nombre: '',
					direccion: '',
					edad: ''
				}
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
				var persona = new Persona({ nombre: $('#nombre-contacto').val(), direccion: $('#dire-contacto').val(), edad: $('#edad-contacto').val()});
				personas.add(persona);
				
				console.log(personas.toJSON());

				return false;
			});

			var appView = new PersonasView();
		});
	})(jQuery);

});