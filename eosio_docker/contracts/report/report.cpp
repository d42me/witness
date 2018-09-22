#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

// Smart Contract Name: report
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(account_name/uint64): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
class report : public eosio::contract
{
  private:

    /// @abi table
    struct reportstruct
    {
        uint64_t prim_key;  // primary key
        std::string hashedMessage;
        account_name user;  // account name for the user

        // primary key
        auto primary_key() const { return prim_key; }
        // secondary key: user
        account_name get_by_user() const { return user; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index<N(reportstruct), reportstruct,
                               indexed_by<N(getbyuser), const_mem_fun<reportstruct, account_name, &reportstruct::get_by_user>>>
        notetable;

  public:
    using contract::contract;

    /// @abi action
    void post(account_name _user, std::string &_hashedMessage)
    {
        // to sign the action with the given account
        require_auth(_user);

        notetable obj(_self, _self); // code, scope

        // insert object
        obj.emplace(_self, [&](auto &address) {
            address.prim_key = obj.available_primary_key();
            address.user = _user;
            address.hashedMessage = _hashedMessage;
        });
    }
};

// specify the contract name, and export a public action: update
EOSIO_ABI(report, (post))
