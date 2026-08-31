describe('network', function () {
  beforeEach(function () {
    eruda.show('network')
  })

  describe('request', function () {
    it('xhr', function (done) {
      $('.eruda-clear-request').click()
      util.ajax.get(window.location.toString(), function () {
        setTimeout(function () {
          expect($('.eruda-requests .luna-data-grid-node')).toHaveLength(1)
          done()
        }, 500)
      })
    })

    it('xhr post json', function (done) {
      $('.eruda-clear-request').click()
      util.ajax({
        type: 'POST',
        url: window.location.toString(),
        data: { foo: 1, bar: 'hello' },
        contentType: 'application/json',
        error: function () {},
        complete: function () {
          setTimeout(function () {
            expect($('.eruda-requests .luna-data-grid-node')).toHaveLength(1)
            $('.eruda-requests .luna-data-grid-node').click()
            expect($('.eruda-data')).toContainText('foo')
            done()
          }, 500)
        },
      })
    })
  })
})
