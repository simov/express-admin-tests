
describe('mtm1', function () {
    before(function (done) {
        client.query(sql.truncate('mtm1'), done);
    });
    it('should be empty', function (done) {
        $('a[href="/mtm1"]')[0].click();
        page.load(function () {
            $('.x-table tbody tr').length.should.equal(0);
            $('a[href="/mtm1/add"]')[0].click();
            page.load(done);
        });
    });
    it('save and add another', function (done) {
        $('[name="view[mtm1][records][0][columns][name1]"]').val('mtm1');
        $('[name="action[another]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/mtm1/add');
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[mtm1][records][0][columns][name1]"]').val().should.equal('');
            done();
        });
    });
    it('save and continue editing', function (done) {
        $('[name="view[mtm1][records][0][columns][name1]"]').val('mtm2');
        $('[name="action[continue]"')[0].click();
        page.load(function () {
            $('.alert-success strong').text().should.equal('Success:');
            $('[name="view[mtm1][records][0][columns][name1]"]').val().should.equal('mtm2');
            $('[name="action[another]"')[0].click();
            page.load(done);
        });
    });
    it('save', function (done) {
        $('[name="view[mtm1][records][0][columns][name1]"]').val('mtm3');
        $('[name="action[save]"')[0].click();
        page.load(function () {
            win.location.pathname.should.equal('/mtm1');
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(3);
            $('.x-table tbody tr:eq(0) a').text().should.equal('mtm1');
            $('.x-table tbody tr:eq(1) a').text().should.equal('mtm2');
            $('.x-table tbody tr:eq(2) a').text().should.equal('mtm3');
            done();
        });
    });
    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});
