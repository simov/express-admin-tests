
tests.otm1 = function () {

describe('otm1', function () {
    before(function (done) {
        client.query(sql.truncate('otm1'), done);
    });
    it('should be empty', function (done) {
        $('a[href="/otm1"]')[0].click();
        page.load(function () {
            $('.x-table tbody tr').length.should.equal(0);
            $('a[href="/otm1/add"]')[0].click();
            page.load(done);
        });
    });
    it('save and add another', function (done) {
        $('[name="view[otm1][records][0][columns][name1]"]').val('otm1');
        $('[name="action[another]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/otm1/add');
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[otm1][records][0][columns][name1]"]').val().should.equal('');
            done();
        });
    });
    it('save and continue editing', function (done) {
        $('[name="view[otm1][records][0][columns][name1]"]').val('otm2');
        $('[name="action[continue]"')[0].click();
        page.load(function () {
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[otm1][records][0][columns][name1]"]').val().should.equal('otm2');
            $('[name="action[another]"')[0].click();
            page.load(done);
        });
    });
    it('save', function (done) {
        $('[name="view[otm1][records][0][columns][name1]"]').val('otm3');
        $('[name="action[save]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/otm1');
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(3);
            $('.x-table tbody tr:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(1) a').text().should.equal('otm2');
            $('.x-table tbody tr:eq(2) a').text().should.equal('otm3');
            done();
        });
    });
});

}
