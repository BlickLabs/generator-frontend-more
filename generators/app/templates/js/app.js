(function () {
  $.validator.setDefaults({
    invalidHandler: function (event, validator) {
      var form = $(this);
      form.find('.form-message')
      .removeClass(form.hasClass('success') ? 'success' : 'error')
      .html('');
    },
    submitHandler: function (form) {
      var $form = $(form).serialize(),
        isNewsletter = typeof $(form).attr('data-newsletter-form') !== typeof undefined,
        isNotAJAX = typeof $(form).attr('data-disable-ajax') !== typeof undefined,
        fields = $(form).find('select, input, textarea, button').not('[disabled]'),
        formMessage = $(form).find('.form-message');

      function setMessage(success) {
        var successMessage = $('<i class="fa fa-check-circle"></i><span>Mensaje enviado exitosamente</span>'),
          newsletterMessage = $('<i class="fa fa-check-circle"></i><span>Suscripción realizada con éxito</span>'),
          errorMessage = $('<i class="fa fa-times-circle"></i><span>Ocurrió un error</span>'),
          message = success ? (isNewsletter ? newsletterMessage : successMessage) : errorMessage;

        fields.removeAttr('disabled');
        formMessage.removeClass(success ? 'error' : 'success');
        formMessage.addClass(success ? 'success' : 'error');
        formMessage.html(message);
      }

      function AJAXDone(data) {
        var condition = isNewsletter ? data.status === 'subscribed' : parseInt(data) === 1;
        setMessage(condition);
        form.reset();
      }

      function AJAXFail() {
        setMessage(false);
      }

      function AJAXAlways() {
        fields.removeAttr('disabled');
        $(form).find('.button-wrapper').removeClass('disabled');
      }

      fields.attr('disabled', 'disabled');
      formMessage.html('');

      if (!$(form).find('.button-wrapper .loader').length) {
        $(form).find('.button-wrapper').addClass('disabled');
      }
      
      if (!isNotAJAX) {
        form.submit();
      } else {
        $.ajax({
          url: $(form).attr('action'),
          method: 'POST',
          data: $form
        })
          .done(AJAXDone)
          .fail(AJAXFail)
          .always(AJAXAlways);
      }
    }
  });
})();