
tests.login = function () {


describe('login', function () {
    before(function (done) {
        $('[name=username]').val('admin');
        $('[name=password]').val('11aaAA');
        $('[type=submit]').trigger('click');
        page.load(done);
    });
    it('logged in', function (done) {
        $('#content h2').text().should.equal('Site administration');
        done();
    });
    after(function (done) {
        win.location = '/logout';
        page.load(done);
    });
});


}
