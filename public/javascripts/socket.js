var socket = io.connect('http://localhost:2000');

var nameplace = $('#nameplace');
var msg = $('#message');
var output = document.getElementById('output');
var feedback = $('#feedback');
var btn = $('#send');

msg.keypress(function () {
    socket.emit('typing', nameplace.val());
});


btn.on('click', function () {
   socket.emit('chat',{
       message: msg.val(),
       name: nameplace.val()
   });
});

socket.on('chat', function (data) {
   $('#feedback').html('');
   $(output).append($('<p><strong>' + data.name + ': </strong>' + data.message + '</p>'));
   $(msg).val('');
});

socket.on('typing', function (data) {
    $(feedback).html(data + ' is typing a message...');

});
